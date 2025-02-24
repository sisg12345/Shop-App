import 'server-only'
import { auth } from './auth'
import { DEFAULT_LOGIN_REDIRECT } from './routes'

export default async function authGuard(
  path: string = DEFAULT_LOGIN_REDIRECT,
  statusCode: number = 401,
) {
  // セッション
  const session = await auth()

  // セッションが存在しない
  if (!session) {
    Response.redirect(path)
  }

  return session
}
