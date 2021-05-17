import type { NextApiRequest, NextApiResponse } from 'next'
import rules from 'domain/rules'
import defaults from 'lodash/defaults'

const makeHandler = ({ mutation, parser, action }) => async (input, req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' && mutation) {
    return res.status(404)
  }
  const parsedInput = parser && parser(input)
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
