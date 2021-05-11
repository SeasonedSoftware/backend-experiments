import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PUT':
      const task = await prisma.task.update({
        where: { id: req.query.id as string },
        data: req.body,
      })
      return res.status(200).json(task)
    case 'DELETE':
      const tasks = await prisma.task.delete({
        where: { id: req.query.id as string },
      })
      return res.status(200).json(tasks)
  }
  res.status(401).end()
}
