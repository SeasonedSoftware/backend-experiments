import { z } from 'zod'
import type { ZodTypeAny } from 'zod'
import { PrismaClient } from '@prisma/client'
import find from 'lodash/find'

const prisma = new PrismaClient()

const taskCreateParser = z.object({ text: z.string() })
const taskDeleteParser = z.object({ id: z.string() })
const taskUpdateParser = z.object({ id: z.string(), text: z.string().optional(), completed: z.boolean().optional() })

export type Action = {
  name: string,
  mutation: boolean,
  parser?: ZodTypeAny,
  action: (input: any) => any
}

const query = (name: string, action: (input: any) => any, parser?: ZodTypeAny) =>
({
  name,
  mutation: false,
  parser,
  action
})

const mutation = (name: string, action: (input: any) => any, parser?: ZodTypeAny) =>
({
  name,
  mutation: true,
  parser,
  action
})

export const tasks: Action[] = [
  mutation("post", (input: z.infer<typeof taskCreateParser>) => prisma.task.create({ data: input }), taskCreateParser),
  query("get", prisma.task.findMany),
  mutation("delete", (input: z.infer<typeof taskDeleteParser>) => prisma.task.delete({
    where: input,
  }), taskDeleteParser),
  mutation("put", (input: z.infer<typeof taskUpdateParser>) => prisma.task.update({
    where: { id: input.id },
    data: input
  }), taskUpdateParser),
  query("send-completed-notifications", (input: any) => {
    console.log({ hello: "world" })
  }),
  mutation("clear-completed", async () => {
    await prisma.task.deleteMany({
      where: { completed: true },
    })
    prisma.task.findMany()
  })
]

const rules: Record<string, Action[]> = { tasks }

export const findAction = (namespace: string, actionName: string) => {
  if (!rules[namespace])
    return undefined

  return find(rules[namespace], (r: Action) => (r.name === actionName))
}

export default rules