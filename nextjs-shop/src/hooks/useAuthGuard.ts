import { useRouter } from 'next/navigation'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

export type AuthGuard = {
  session: Session | null
  redirect: () => void
}

export type UseAuthGuard = {
  path?: string
  queryParams?: { [key: string]: string } | { [key: string]: string }[]
}

/**
 * 認証ガード - クライアントコンポーネント
 *
 * @param path 遷移先パス
 * @param query クエリ
 * @returns セッションとリダイレクト関数
 */
export default function useAuthGuard(
  path: UseAuthGuard['path'] = '/',
  queryParams?: UseAuthGuard['queryParams'],
): AuthGuard {
  // ルータのフック
  const router = useRouter()
  // セッション
  const { data: session } = useSession()

  const redirect = () => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if (!session) {
      // クエリパラメーター
      const params = new URLSearchParams()
      // クエリが複数件
      if (Array.isArray(queryParams)) {
        queryParams.forEach((query) => {
          Object.keys(query).forEach((key) => {
            params.append(key, query[key])
          })
        })
      } else {
        // クエリが1件
        queryParams &&
          Object.keys(queryParams).forEach((key) => {
            params.append(key, queryParams[key])
          })
      }

      // サインイン画面に遷移
      router.push(`${path}?${params}`)
    }
  }

  return { session, redirect }
}
