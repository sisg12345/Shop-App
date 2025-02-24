'use server'

import { MESSAGE } from '@/constants'
import { signIn } from '@/lib/auth/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/dist/server/api-utils'
import { headers } from 'next/headers'

// サインインフォームのデータ
export type SigninFormData = {
  email: string
  password: string
}

/**
 * サインイン認証
 *
 * @param prevState 古い状態
 * @param formData フォームデータ
 * @returns 処理失敗: エラー返却, 処理成功: ホーム画面に遷移
 */
export async function authenticate(prevState: unknown, formData: SigninFormData) {
  // 実行時のURLは'referer'ヘッダーに格納されている
  const referer = (await headers()).get('referer')
  // URLを解析してクエリパラメータを取得
  if (!referer) {
    throw new Error('Referer header is missing')
  }
  const url = new URL(referer)
  // クエリパラメーターを取得
  const queryParams = Object.fromEntries(url.searchParams.entries())
  // クエリパラメーターにリダイレク先があればそれをセット
  const redirectTo = queryParams['redirect_to']

  try {
    // 認証
    await signIn('credentials', { ...formData, redirectTo: redirectTo ?? '/' })
  } catch (error) {
    // 認証失敗
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return MESSAGE.error.credentialsSignin
        default:
          return MESSAGE.failure
      }
    }

    throw error
  }
}
