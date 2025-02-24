import { auth } from '@/lib/auth/auth'
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, privateRoutes } from '@/lib/auth/routes'

/**
 * 認証 - 画面遷移
 */
export default auth(async (request) => {
  // 遷移先URL
  const { nextUrl } = request
  // サインイン済みか
  const isLoggedIn = !!request.auth

  // APIルート
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  // 認証を必要としないルート
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
  // 認証ルート
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // APIルートへのアクセスを許可
  if (isApiAuthRoute) {
    return
  }
  // 認証ルート
  if (isAuthRoute) {
    // サインイン済みならホーム画面に遷移
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    // 認証ルートへのアクセス許可
    return
  }
  // サインイン済みではない、認証を必要なルートにアクセスした場合はサインイン画面に遷移
  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL('/signin', nextUrl))
  }

  return
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
