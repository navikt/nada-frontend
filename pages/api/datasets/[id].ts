import type { NextApiRequest, NextApiResponse } from 'next'
import { DatasetSchema } from '../../../lib/schema_types'

const response: DatasetSchema = {
  id: 'DS_1',
  dataproduct_id: 'DP_1',
  name: 'Team Risk',
  description: `## Team Risk – regelanalyse
  Brukes som beslutningsgrunnlag i forbindelse med utvikling av en risk-komponent i ny sykepengeløsning`,
  pii: false,
  bigquery: {
    project_id: 'projectid',
    dataset: 'datasetid',
    table: 'tableid',
  },
}

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(response)
}

export default handler
