import type {NextApiRequest, NextApiResponse} from 'next'
import { serialize } from 'cookie';

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Set-Cookie', serialize('login', 'bogus', { path: '/' }));
    res.redirect("/")
}

export default handler
