import 'server-only'

import { Command } from './command'
import { ResponseResult } from '@/types'
import { ErrorMessages } from '../../../../utils/yupUtil'
import { MESSAGE } from '@/constants'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import { UserEntity } from '@/server/domain/entities/userEntity'

export class GetUserHandler {
  constructor(
    private readonly command: Command,
    private readonly userRepository: UserRepository,
  ) {}

  public async handle(): Promise<ResponseResult<UserEntity>> {
    // 処理結果
    let success = true
    // メッセージ
    let message
    // エラーメッセージオブジェクト
    let errors: ErrorMessages = {}
    // 取得データ
    let data

    try {
      // ユーザーを取得
      data = (await this.userRepository.findById(this.command.userId)) as UserEntity
    } catch (error: unknown) {
      // 処理失敗
      success = false
      // メッセージ
      message = MESSAGE.failure
    }

    return {
      success,
      message,
      errors,
      data,
    }
  }
}
