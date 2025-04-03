'use server'

import { MESSAGE } from '@/constants'
import { signIn } from '@/lib/auth/auth'
import { AuthError } from 'next-auth'
import { headers } from 'next/headers'

// サインインフォーム
export type SigninFormData = {
  /** メールアドレス */
  email: string
  /** パスワード */
  password: string
}

/**
 * サインイン認証
 *
 * @param prevState 状態
 * @param formData フォームデータ
 * @returns 処理失敗: エラー返却, 処理成功: ホーム画面に遷移 (Auth.jsにて制御)
 */
export async function signin(prevState: unknown, formData: SigninFormData): Promise<string | void> {
  // 実行時のURLは'referer'ヘッダーに格納されている
  const referer = (await headers()).get('referer')
  // URLを解析してクエリパラメータを取得
  if (!referer) {
    throw new Error('Referer header is missing')
  }
  // URLオブジェクトを生成
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
