import { auth } from '@/lib/auth/auth'
import {
  apiAuthPrefix,
  authGuardApis,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  denyApis,
  privateRoutes,
} from '@/lib/auth/routes'
import type { HttpMethod } from './types'

/**
 * 認証 - 画面遷移
 */
export default auth(async (request) => {
  // セッション
  const session = await auth()
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
  // アクセス拒否するルート
  const isDenyRoute = Object.keys(denyApis).includes(nextUrl.pathname)
  // アクセス拒否するルートのHTTPメソッド
  const isDenyMethod = denyApis[nextUrl.pathname]?.includes(request.method as HttpMethod)

  // 認証ガード
  if (session === null) {
    // アクセス拒否するルート
    const isDenyRoute = Object.keys(authGuardApis).includes(nextUrl.pathname)
    // アクセス拒否するルートのHTTPメソッド
    const isDenyMethod = authGuardApis[nextUrl.pathname]?.includes(request.method as HttpMethod)

    // アクセス拒否
    if (isDenyRoute && isDenyMethod) {
      return Response.redirect(new URL('/signin', nextUrl))
    }
  }

  // apiへのアクセスを拒否
  if (isDenyRoute && isDenyMethod) {
    return Response.redirect(new URL('/signin', nextUrl))
  }
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
