import { NextApiRequest, NextApiResponse } from 'next'
import { mockDataproduct } from './[id]'

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)

  if (req.method == 'POST') {
    res.status(201).json(mockDataproduct)
  }
}

export default handler
