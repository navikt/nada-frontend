import type {NextApiRequest, NextApiResponse} from 'next'
import {DataproductSchema} from '../../../lib/schema_types'

const response: DataproductSchema = {
    id: 'test',
    name: 'Team Risk',
    description: `## Team Risk – regelanalyse
    Brukes som beslutningsgrunnlag i forbindelse med utvikling av en risk-komponent i ny sykepengeløsning.`,
    slug: 'lorem ipsum',
    repo: 'lorem ipsum',
    last_modified: '2013-09-10T19:00Z',
    created: '1887-08-21T19:00Z',
    owner: {
        team: 'Test team',
        teamkatalogen: 'Test team',
    },
    keywords: ['lorem ipsum', 'sorryyy'],
    datasets: [
        {
            id: 'DS_1',
            name: 'Treff på regler over tid',
            type: 'bigquery',
        },
        {
            id: 'DS_2',
            name: 'Kumulativt antall saker',
            type: 'bigquery',
        },
    ],
}

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(response)
}

export default handler
