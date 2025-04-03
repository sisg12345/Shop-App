import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import { Command } from './command'
import type { ResponseResult } from '@/types'
import { generateErrors, type ErrorMessages } from '@/utils/yupUtil'
import { userProfileFormSchema } from '@/lib/services/users/validations'
import { MESSAGE } from '@/constants'
import yup from '@/lib/yup'
import { UserService } from '@/server/domain/services/userService'
import { UpdateUserDto } from '@/server/domain/dtos/updateUserDto'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'

export class UpdateUserHandler {
  constructor(
    private readonly command: Command,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  public async handle(): Promise<ResponseResult> {
    // 処理結果
    let success = true
    // メッセージ
    let message
    // エラーメッセージオブジェクト
    let errors: ErrorMessages = {}

    try {
      // バリデーション実行
      this.validate(this.command)

      // ユーザープロフィール画像アップロード
      const profileImageUrl = await this.userService.fileUpload(this.command.images[0].file)
      // ユーザー保存DTO
      const saveUserDto = new UpdateUserDto(
        this.command.userId,
        this.command.email,
        this.command.username ?? '',
        this.command.displayName ?? '',
        this.command.description ?? '',
        profileImageUrl ?? '',
      )
      // ユーザー情報更新
      this.userRepository.update(saveUserDto)
      // パスワードが変更された場合
      if (this.command.newPassword) {
        // パスワードハッシュ化
        const newPassword = await this.userService.encryptPassword(this.command.newPassword)
        // パスワード更新
        this.userRepository.updatePassword(this.command.userId, newPassword)
      }
      // ユーザー登録DTO
    } catch (error: unknown) {
      // 処理失敗
      success = false
      // メッセージ
      message = MESSAGE.failure

      // フォームバリデーション例外
      if (error instanceof yup.ValidationError) {
        // エラーオブジェクト生成
        errors = generateErrors(error)
      }
      // ファイルアップロード例外
      if (error instanceof FileUploadError) {
        message = error.message
      }
    }

    return {
      success,
      message,
      errors,
    }
  }

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  private async validate(command: Command) {
    await userProfileFormSchema.validate(command, { abortEarly: false })
  }
}
