import type { ResponseResult } from '@/types'
import { Command } from './command'
import { generateErrors } from '@/utils/yupUtil'
import type { ErrorMessages } from '@/utils/yupUtil'
import yup from '@/lib/yup'
import { MESSAGE } from '@/constants'
import { signupFormSchema } from '@/lib/services/auth/validations'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import { ExistError } from '@/server/shared/errors/existError'
import { SaveUserDto } from '@/server/domain/dtos/saveUserDto'
import { UserService } from '@/server/domain/services/userService'

export class CreateUserHandler {
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
      // ユーザー情報取得
      const user = await this.userRepository.findByEmail(this.command.email)
      if (user) {
        throw new ExistError(MESSAGE.error.EmailIsExist)
      }

      // パスワードハッシュ化
      const password = await this.userService.encryptPassword(this.command.password)
      // ユーザー保存DTO
      const saveUserDto = new SaveUserDto(
        this.command.userId,
        this.command.email,
        password,
        '',
        '',
        '',
        '/placeholder-125.png',
      )
      // 保存
      await this.userRepository.save(saveUserDto)
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
    // ファームのバリデーション
    await signupFormSchema.validate(command, { abortEarly: false })
  }
}
