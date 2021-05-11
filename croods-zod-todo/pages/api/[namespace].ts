import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import rules from  'domain/rules'

import type TaskCreate from 'domain'
const prisma = new PrismaClient()

const makeHandler = ({parser, action}) => async (req: NextApiRequest, res: NextApiResponse) => {
  const input = parser && parser(req.body)
  const taskResult = await action(input)
  return res.status(200).json(taskResult)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const n = req.query.namespace as string
  switch (req.method) {
    case 'POST':
      return makeHandler(rules[n].create)(req, res)
    case 'GET':
      return makeHandler(rules[n].list)(req, res)
  }
  res.status(401).end()
}
