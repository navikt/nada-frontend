import type { NextApiRequest, NextApiResponse } from 'next'
import { UserInfoSchema } from '../../lib/schema/schema_types'

const mockUserInfo: UserInfoSchema = {
  name: 'Bobby Brown',
  email: 'bobby.brown@nav.no',
  teams: ['nada', 'knada'],
}

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  req.cookies['login'] !== 'innlogget'
    ? res.status(200).json(null)
    : res.status(200).json(mockUserInfo)
}

export default handler
