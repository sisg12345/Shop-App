'use server'

import type { FileData } from '@/components/molecules/Images/InputImages'
import { auth } from '@/lib/auth/auth'
import { Command } from '@/server/application/user/update/command'
import { UpdateUserHandler } from '@/server/application/user/update/UpdateUserHandler'
import { UserService } from '@/server/domain/services/userService'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import type { ResponseResult } from '@/types'
import { redirect } from 'next/navigation'

/**
 * ユーザープロフィールフォーム
 */
export type UserProfileFormData = {
  /** メールアドレス */
  email: string
  /** 新パスワード */
  newPassword?: string
  /** 新確認パスワード */
  newPasswordConfirm?: string
  // /** ユーザー名 */
  username?: string
  // /** ユーザー表示名 */
  displayName?: string
  // /** プロフィール画像 */
  images: FileData[]
  // /** 説明 */
  description?: string
}

/**
 * ユーザープロフィール更新
 *
 * @param prevState 状態
 * @param formData フォームデータ
 */
export async function updateUserProfile(
  prevState: unknown,
  formData: UserProfileFormData,
): Promise<ResponseResult | void> {
  const session = await auth()

  // ユースケースのインプットデータ
  const inputData = new Command(
    Number(session?.user?.id),
    formData.email,
    formData.images,
    formData.newPassword,
    formData.newPasswordConfirm,
    formData.username,
    formData.displayName,
    formData.description,
  )

  // ユースケース実行
  const { success, message, errors }: ResponseResult = await new UpdateUserHandler(
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
