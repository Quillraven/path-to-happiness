import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loadMockData() {
  // create users
  await prisma.user.createMany({
    data: Array(10)
      .fill(null)
      .map(() => ({
        name: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLocaleLowerCase(),
        image: faker.image.avatar()
      }))
  });

  // create bucket lists
  const users = await prisma.user.findMany();
  for (const user of users) {
    const numberOfBucketLists = Math.floor(Math.random() * 13) + 2;

    await prisma.bucketList.create({
      data: {
        author: { connect: { id: user.id } },
        entries: Array(numberOfBucketLists)
          .fill(null)
          .map(() => faker.lorem.sentence(Math.floor(Math.random() * 5) + 1))
      }
    });
  }
}

loadMockData().then(async () => {
  await prisma.$disconnect();
});