import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loadMockData() {
  // create users
  const numUsers = 50;
  await prisma.user.createMany({
    data: Array(numUsers)
      .fill(null)
      .map(() => ({
        name: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLocaleLowerCase(),
        image: faker.image.avatar(),
      })),
  });

  // create bucket lists
  const users = await prisma.user.findMany();
  for (const user of users) {
    const numBlEntries = Math.floor(Math.random() * 13) + 2;

    await prisma.bucketList.create({
      data: {
        author: { connect: { id: user.id } },
        entries: Array(numBlEntries)
          .fill(null)
          .map(() => faker.lorem.sentence(Math.floor(Math.random() * 9) + 1)),
      },
    });
  }
}

loadMockData().then(async () => {
  await prisma.$disconnect();
});
