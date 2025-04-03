'use server'

import { auth } from '@/lib/auth/auth'
import { Command } from '@/server/application/user/create/command'
import { CreateUserHandler } from '@/server/application/user/create/createUserHandler'
import { UserService } from '@/server/domain/services/userService'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import type { ResponseResult } from '@/types'
import { redirect } from 'next/navigation'

/**
 * サインアップフォーム
 */
export type SignupFormData = {
  /** メールアドレス */
  email: string
  /** パスワード */
  password: string
  /** 確認パスワード */
  passwordConfirm: string
}

/**
 * サインアップ
 *
 * @param prevState 状態
 * @param formData  フォームデータ
 * @returns
 */
export default async function signup(
  prevState: unknown,
  formData: SignupFormData,
): Promise<ResponseResult | void> {
  // セッション
  const session = await auth()

  // ユースケースのインプットデータ
  const inputData = new Command(
    Number(session?.user?.id),
    formData.email,
    formData.password,
    formData.passwordConfirm,
  )

  // ユースケース実行
  const { success, message, errors }: ResponseResult = await new CreateUserHandler(
    inputData,
    new UserService(),
    new UserRepository(),
  ).handle()

  // エラーが存在する場合
  if (!success) {
    return {
      success,
      message,
      errors,
    }
  }

  redirect('/')
}
