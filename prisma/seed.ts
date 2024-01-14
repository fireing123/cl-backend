import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const user = await prisma.user.create({
        data: {
            email:"gimd82368@gmail.com",
            rank:"admin",
        },
    });
    const file = await prisma.file.create({
        data: {
            url: "%EC%A2%85%ED%95%A9-%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%9A%A9-%EB%B8%94%EB%A1%9C%EA%B7%B8-ImM6zkbjQcJiinjFLzeEU3WJ8ytK4s",
            publicAuthority: "R",
            userId: user.id
        }
    })
    await prisma.post.create({
        data: {
            title: "종합-테스트용-블로그",
            fileId: "65912dff840d44b18331ef55",
            date: "2023-12-31T09:01:52.234+00:00",
            userId: user.id
        }
    })
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });