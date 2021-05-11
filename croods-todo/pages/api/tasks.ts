import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      const task = await prisma.task.create({ data: req.body })
      return res.status(200).json(task)
    case 'GET':
      const tasks = await prisma.task.findMany()
      return res.status(200).json(tasks)
  }
  res.status(401).end()
}
