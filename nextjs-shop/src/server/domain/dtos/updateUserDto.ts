import 'server-only'

import type { User } from '@/types'

/**
 * ユーザー情報更新DTO
 */
export class UpdateUserDto {
  constructor(
    /** ユーザーID */
    public readonly userId: User['id'],
    /** メールアドレス */
    public readonly email: string,
    /** ユーザー名 */
    public readonly username: string,
    /** ユーザー表示名 */
    public readonly displayName: string,
    /** 説明 */
    public readonly description: string,
    /** プロフィール画像のURL */
    public readonly profileImageUrl: string,
  ) {}
}
