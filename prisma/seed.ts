import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient()
async function main() {
  const adminRole = await prisma.roles.create({
    data: {
      name: 'ADMIN',
    },
  })
  const userRole = await prisma.roles.create({
    data: {
      name: 'USER',
    },
  })
  const admin = await prisma.user.create({
    data: {
      username: 'alex',
      passwordHash: await bcrypt.hash('bob', 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: 'ADMIN' } },
    },
  })

  const user = await prisma.user.create({
    data: {
      username: 'job',
      passwordHash: await bcrypt.hash('job', 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: 'USER' } },
    },
  })
  console.log({ adminRole, userRole, admin, user })

  
}
main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})