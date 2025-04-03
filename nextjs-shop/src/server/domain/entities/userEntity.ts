import type { User } from '@/types'

/**
 * ユーザーエンティティ
 */
export class UserEntity {
  constructor(
    /** ユーザーID */
    public id: User['id'],
    /** メールアドレス */
    public email: string,
    /** ユーザー名 */
    public username: string,
    /** ユーザー表示名 */
    public displayName: string,
    /** プロフィール画像のURL */
    public profileImageUrl: string,
    /** 説明 */
    public description: string,
    /** 作成ユーザー */
    public createUser: User['id'],
    /** 作成日付 */
    public createDate: Date,
    /** 更新ユーザー */
    public updateUser: User['id'],
    /** 更新日付 */
    public updateData: Date,
  ) {}
}
