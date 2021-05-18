import { z } from 'zod'
import type { ZodTypeAny } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const taskCreateParser = z.object({ text: z.string() })
const taskDeleteParser = z.object({ id: z.string() })
const taskUpdateParser = z.object({ id: z.string(), text: z.string().optional(), completed: z.boolean().optional() })

export type Action = {
  mutation: boolean,
  parser?: ZodTypeAny,
  action: (input: any) => any
}

type Actions = Record<string, Action>

const query = (action: (input: any) => any, parser?: ZodTypeAny) =>
({
  mutation: false,
  parser,
  action
})

const mutation = (action: (input: any) => any, parser?: ZodTypeAny) =>
({
  mutation: true,
  parser,
  action
})

export const tasks: Actions = {
  post: mutation((input: z.infer<typeof taskCreateParser>) => prisma.task.create({ data: input }), taskCreateParser),
  get: query(prisma.task.findMany),

  delete: mutation((input: z.infer<typeof taskDeleteParser>) => prisma.task.delete({
    where: input,
  }), taskDeleteParser),
  put: mutation((input: z.infer<typeof taskUpdateParser>) => prisma.task.update({
    where: { id: input.id },
    data: input
  }), taskUpdateParser),
  "clear-completed": mutation(async () => {
    await prisma.task.deleteMany({
      where: { completed: true },
    })
    prisma.task.findMany()
  })
}

const rules: Record<string, Actions> = { tasks }
export default rules