import { NextApiRequest } from 'next'

export async function GET(request: NextApiRequest) {
  return Response.json({ request })
}
