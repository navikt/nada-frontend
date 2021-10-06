import { NextApiRequest, NextApiResponse } from 'next'
import { mockDataset } from './[id]'

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)

  if (req.method == 'POST') {
    res.status(201).json(mockDataset)
  }
}

export default handler
