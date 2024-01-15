    declare module 'next-auth' {
      interface Session {
        user: {
          email: string;
          name: string;
          image: string;

          userId: string;
          username: string;
          rank: string
        };
      }
    }

export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    publicAddress?: string | null;

    username: string | null;
    rank: String;
    phoneNumber: string | null;
  }
  