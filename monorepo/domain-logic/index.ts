import { z } from 'zod'
import type { ZodTypeAny } from 'zod'
import { PrismaClient } from '@prisma/client'
import { either } from 'fp-ts'

const prisma = new PrismaClient()

const taskCreateParser = z.object({ text: z.string() })
const taskDeleteParser = z.object({ id: z.string() })
const taskUpdateParser = z.object({
  id: z.string(),
  text: z.string().optional(),
  completed: z.boolean().optional(),
})

type Error = { errors: Record<string, string> }
type Result = either.Either<Error, any>

export type ActionResult = Result | Promise<Result>

export const success = either.right
export const error = either.left

export type Action = {
  mutation: boolean
  parser?: ZodTypeAny
  action: (input: any) => ActionResult
}

export type Actions = Record<string, Action>

const query = (action: (input: any) => ActionResult, parser?: ZodTypeAny) => ({
  mutation: false,
  parser,
  action,
})

const mutation = (
  action: (input: any) => ActionResult,
  parser?: ZodTypeAny,
) => ({
  mutation: true,
  parser,
  action,
})

export const tasks: Actions = {
  post: mutation(
    async (input: z.infer<typeof taskCreateParser>) =>
      success(await prisma.task.create({ data: input })),
    taskCreateParser,
  ),
  get: query(async () => success(await prisma.task.findMany())),
  delete: mutation(
    async (input: z.infer<typeof taskDeleteParser>) =>
      success(
        await prisma.task.delete({
          where: input,
        }),
      ),
    taskDeleteParser,
  ),
  put: mutation(
    async (input: z.infer<typeof taskUpdateParser>) =>
      success(
        await prisma.task.update({
          where: { id: input.id },
          data: input,
        }),
      ),
    taskUpdateParser,
  ),
  'send-completed-notifications': query((input: any) => {
    console.log({ hello: 'world' })
    return success(null)
  }),
  'clear-completed': mutation(async () => {
    await prisma.task.deleteMany({
      where: { completed: true },
    })
    return success(prisma.task.findMany())
  }),
}

export type DomainActions = Record<string, Actions>

const rules: DomainActions = { tasks }

const findActionInDomain =
  (rules: DomainActions) => (namespace: string, actionName: string) =>
    (rules[namespace] && rules[namespace][actionName]) as Action | undefined

export const findAction = findActionInDomain(rules)

export default rules
