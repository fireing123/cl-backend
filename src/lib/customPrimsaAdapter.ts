import type { Prisma, PrismaClient, User } from '@prisma/client';
import { AdapterAccount, AdapterSession, AdapterUser } from 'next-auth/adapters';
import { Adapter } from 'next-auth/adapters';

export interface PrismaUser extends Omit<User, 'emailVerified' | 'email' | 'image' | 'name'>, AdapterUser {}


export function CustomPrismaAdapter(p: PrismaClient): Adapter {
    return {
      createUser: (user: Omit<AdapterUser, 'id'>): Promise<PrismaUser> => p.user.create({ data: user as PrismaUser }) as Promise<PrismaUser>,
      getUser: (id: string) => p.user.findUnique({ where: { id } }) as Promise<PrismaUser>,
      getUserByEmail: (email: string) => p.user.findUnique({ where: { email } }) as Promise<PrismaUser>,
      async getUserByAccount(provider_providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>) {
        const account = await p.account.findUnique({
          where: { provider_providerAccountId },
          select: { user: true },
        });
        return account?.user ? (account?.user as PrismaUser) : null;
      },
      updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }) as Promise<PrismaUser>,
      deleteUser: (id: string): Promise<AdapterUser> => p.user.delete({ where: { id } }) as Promise<PrismaUser>,
      linkAccount: (data) => p.account.create({ data }) as unknown as AdapterAccount,
      unlinkAccount: (provider_providerAccountId) =>
        p.account.delete({
          where: { provider_providerAccountId },
        }) as unknown as AdapterAccount,
      async getSessionAndUser(sessionToken: string): Promise<{
        session: AdapterSession;
        user: AdapterUser;
      } | null> {
        const userAndSession = await p.session.findUnique({
          where: { sessionToken },
          include: { user: true },
        });
        if (!userAndSession) return null;
        const { user, ...session } = userAndSession;
        return { user: user as AdapterUser, session };
      },
      createSession: (data) => p.session.create({ data }),
      updateSession: (data) => p.session.update({ where: { sessionToken: data.sessionToken }, data }),
      deleteSession: (sessionToken) => p.session.delete({ where: { sessionToken } }),
      async createVerificationToken(data) {
        const verificationToken = await p.verificationToken.create({ data });
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id;
        return verificationToken;
      },
      async useVerificationToken(identifier_token) {
        try {
          const verificationToken = await p.verificationToken.delete({
            where: { identifier_token },
          });
          // @ts-expect-errors // MongoDB needs an ID, but we don't
          if (verificationToken.id) delete verificationToken.id;
          return verificationToken;
        } catch (error) {
          // If token already used/deleted, just return null
          // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
          if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025') return null;
          throw error;
        }
      },
    };
  }