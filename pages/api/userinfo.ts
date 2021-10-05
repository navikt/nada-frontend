import type { NextApiRequest, NextApiResponse } from 'next'
import { UserInfoSchema } from '../../lib/schema_types'

const response: UserInfoSchema = {
  name: 'Bobby Brown',
  email: 'bobby.brown@nav.no',
  teams: ['nada', 'knada'],
}

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  req.cookies['login'] !== 'innlogget'
    ? res.status(200).json(null)
    : res.status(200).json(response)
}

export default handler
