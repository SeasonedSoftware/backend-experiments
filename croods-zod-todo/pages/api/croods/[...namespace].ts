import type { NextApiRequest, NextApiResponse } from 'next'
import rules from  'domain/rules'

const makeHandler = ({parser, action}) => async (req: NextApiRequest, res: NextApiResponse) => {
  const input = parser && parser(req.body)
  const taskResult = await action(input)
  return res.status(200).json(taskResult)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [namespace, requestedAction] = req.query.namespace as string[]

  const actionName = requestedAction ||
    (req.method == 'POST' ? 'create' : 'list')
  if(rules[namespace][actionName])
    return makeHandler(rules[namespace][actionName])(req, res)
  else
    res.status(404).end()
}
