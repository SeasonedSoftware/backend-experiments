import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const taskCreateParser = z.object({ text: z.string() })

export const tasks : Record<string, any> = {
  create: {
    parser: taskCreateParser.parse,
    action: (input : z.infer<typeof taskCreateParser>) => prisma.task.create({ data: input })
  },
  list: {
    action: prisma.task.findMany
  }
}

const rules : Record<string, any> = { tasks }
export default  rules