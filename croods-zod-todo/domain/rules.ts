import { z } from 'zod'
import type { ZodTypeAny } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const taskCreateParser = z.object({ text: z.string() })
const taskDeleteParser = z.object({ id: z.string() })
const taskUpdateParser = z.object({ id: z.string(), text: z.string().optional(), completed: z.boolean().optional() })

type Action = {
  mutation: boolean,
  parser?: ZodTypeAny,
  action: (input: any) => any
}

type Actions = Record<string, Action>

export const tasks: Actions = {
  post: {
    mutation: true,
    parser: taskCreateParser,
    action: (input: z.infer<typeof taskCreateParser>) => prisma.task.create({ data: input })
  },
  get: {
    mutation: false,
    action: prisma.task.findMany
  },
  delete: {
    mutation: true,
    parser: taskDeleteParser,
    action: (input: z.infer<typeof taskDeleteParser>) => prisma.task.delete({
      where: input,
    })
  },
  put: {
    mutation: true,
    parser: taskUpdateParser,
    action: (input: z.infer<typeof taskUpdateParser>) => prisma.task.update({
      where: { id: input.id },
      data: input
    })
  },
  "clear-completed": {
    mutation: true,
    action: async () => {
      await prisma.task.deleteMany({
        where: { completed: true },
      })
      prisma.task.findMany()
    }
  }
}

const rules: Record<string, Actions> = { tasks }
export default rules