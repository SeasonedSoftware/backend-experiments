import type { NextApiRequest, NextApiResponse } from 'next'
import rules, { Action } from 'domain-logic'
import defaults from 'lodash/defaults'

const makeHandler = ({ mutation, parser, action }: Action) => async (input: any, req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' && mutation) {
    res.setHeader('Allow', 'POST, PATCH, PUT, DELETE')
    return res.status(405).end()
  }
  const parsedInput = parser && parser.parse(input)
  const taskResult = await action(parsedInput)
  return res.status(200).json(taskResult)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [namespace, requestedAction] = req.query.actionPath as string[]

  const domainRule = rules[namespace][requestedAction] || rules[namespace][req.method!.toLowerCase()]
  const id = rules[namespace][requestedAction] === undefined && requestedAction ? requestedAction : null

  let params = { id }

  if (domainRule)
    return makeHandler(domainRule)(defaults(params, req.body), req, res)
  else
    res.status(404).end()
}
