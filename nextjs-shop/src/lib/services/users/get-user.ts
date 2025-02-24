import { ApiContext, User } from '@/types'
import { fetcher } from '@/utils/fetch/fetcher'

type SearchUserPrams = {
  /** ユーザーID */
  id: number
}

/**
 * ユーザーAPI - 個別取得
 *
 * @param context APIコンテキスト
 * @param params パラメーター
 * @returns ユーザー
 */
const searchUser = async (context: ApiContext, { id }: SearchUserPrams): Promise<User> => {
  return await fetcher(`${context.apiRootUrl}/users/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default searchUser
