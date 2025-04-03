import 'server-only'

import { UserEntity } from '@/server/domain/entities/userEntity'
import { SaveUserDto } from '@/server/domain/dtos/saveUserDto'
import { UpdateUserDto } from '@/server/domain/dtos/updateUserDto'
import type { User } from '@/types'

export interface IUserRepository {
  /**
   * ユーザーを保存
   *
   * @param dto ユーザー情報
   */
  save(dto: SaveUserDto): Promise<void>

  /**
   * ユーザーを更新
   *
   * @param dto ユーザー情報
   */
  update(dto: UpdateUserDto): Promise<void>

  /**
   * パスワード更新
   *
   * @param userId ユーザーID
   * @param password パスワード
   */
  updatePassword(userId: User['id'], password: string): Promise<void>

  /**
   * メールアドレスからユーザーを取得
   *
   * @param email メールアドレス
   */
  findByEmail(email: string): Promise<UserEntity | null>
}
