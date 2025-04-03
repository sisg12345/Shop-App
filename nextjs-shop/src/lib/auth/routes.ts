import type { HttpMethod } from '@/types'

// 品証を必要とするページ
export const privateRoutes: string[] = []

// サインインしているユーザーをルートディレクトリ「/」にリダイレクト
export const authRoutes: string[] = ['/signin', '/signup']

// APIルートのプレフィックス
export const apiAuthPrefix: string = '/api'

// ユーザーがログインした後に自動的にリダイレクトされるデフォルトのパス
export const DEFAULT_LOGIN_REDIRECT: string = '/'

type DenyApis = {
  [api: string]: HttpMethod[]
}

// apiアクセス拒否リスト
export const denyApis: DenyApis = {} as const

// api認証ガードリスト
export const authGuardApis: DenyApis = { '/user': ['GET'], '/userProfile': ['GET'] } as const
