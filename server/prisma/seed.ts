import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultUser = await prisma.user.findUnique({
    where: {
      email: 'magicInk@email.com',
    },
  });

  if (!defaultUser) {
    await prisma.user.create({
      data: {
        email: 'magicInk@email.com',
        password: 'password', 
        profiles: {
          create: [], 
        },
      },
    });
    console.log('Default user created.');
  } else {
    console.log('Default user already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });