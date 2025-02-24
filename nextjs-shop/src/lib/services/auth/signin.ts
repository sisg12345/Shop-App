import { ApiContext, User } from '@/types'
import { fetcher } from '@/utils/fetch/fetcher'

// サインパラーメター
type SigninParams = {
  /** ユーザー名 */
  username: string
  /** パスワード */
  password: string
}

/**
 * 認証API - サインイン
 *
 * @param context APIコンテキスト
 * @param params パラメーター
 * @returns ログインユーザー
 */
const signin = async (context: ApiContext, params: SigninParams): Promise<User> => {
  return await fetcher(`${context.apiRootUrl}/auth/signin`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export default signin
