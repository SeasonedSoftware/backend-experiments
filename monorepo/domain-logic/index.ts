import { z } from 'zod'
import type { ZodTypeAny } from 'zod'
import { PrismaClient } from '@prisma/client'
import find from 'lodash/find'

const prisma = new PrismaClient()

const taskCreateParser = z.object({ text: z.string() })
const taskDeleteParser = z.object({ id: z.string() })
const taskUpdateParser = z.object({ id: z.string(), text: z.string().optional(), completed: z.boolean().optional() })

export type Action = {
  mutation: boolean,
  parser?: ZodTypeAny,
  action: (input: any) => any
}

export type Actions = Record<string, Action>

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
  "post": mutation((input: z.infer<typeof taskCreateParser>) => prisma.task.create({ data: input }), taskCreateParser),
  "get": query(prisma.task.findMany),
  "delete": mutation((input: z.infer<typeof taskDeleteParser>) => prisma.task.delete({
    where: input,
  }), taskDeleteParser),
  "put": mutation((input: z.infer<typeof taskUpdateParser>) => prisma.task.update({
    where: { id: input.id },
    data: input
  }), taskUpdateParser),
  "send-completed-notifications": query((input: any) => {
    console.log({ hello: "world" })
  }),
  "clear-completed": mutation(async () => {
    await prisma.task.deleteMany({
      where: { completed: true },
    })
    prisma.task.findMany()
  })
}

export type DomainActions = Record<string, Actions>

const rules: DomainActions = { tasks }

const findActionInDomain = (rules: DomainActions) => (namespace: string, actionName: string) =>
  rules[namespace] && rules[namespace][actionName]

export const findAction = findActionInDomain(rules)

export default rules