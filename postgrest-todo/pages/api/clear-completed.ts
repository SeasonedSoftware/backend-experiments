import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await prisma.task.deleteMany({
      where: { completed: true },
    })
    const tasks = await prisma.task.findMany()
    return res.status(200).json(tasks)
  }
  res.status(401).end()
}
