import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const taskCreateParser = z.object({ text: z.string() })
const taskDeleteParser = z.object({ id: z.string() })
const taskUpdateParser = z.object({ id: z.string(), text: z.string().optional(), completed: z.boolean().optional() })

export const tasks : Record<string, any> = {
  post: {
    parser: taskCreateParser.parse,
    action: (input : z.infer<typeof taskCreateParser>) => prisma.task.create({ data: input })
  },
  get: {
    action: prisma.task.findMany
  },
  delete: {
    parser: taskDeleteParser.parse,
    action: (input : z.infer<typeof taskDeleteParser>) => prisma.task.delete({
      where: input,
    })
  },
  put: {
    parser: taskUpdateParser.parse,
    action: (input : z.infer<typeof taskUpdateParser>) => prisma.task.update({
      where: { id: input.id },
      data: input
    })
  },
  "clear-completed": {
    action: async () => {
      await prisma.task.deleteMany({
              where: { completed: true },
            })
      prisma.task.findMany()
    }
  }
}

const rules : Record<string, any> = { tasks }
export default  rules