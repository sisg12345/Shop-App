// 品証を必要とするページ
export const privateRoutes: string[] = []

// サインインしているユーザーをルートディレクトリ「/」にリダイレクト
export const authRoutes: string[] = ['/signin', '/signup']

// APIルートのプレフィックス
export const apiAuthPrefix: string = '/api'

// ユーザーがログインした後に自動的にリダイレクトされるデフォルトのパス
export const DEFAULT_LOGIN_REDIRECT: string = '/'
