import 'server-only'

import type { FileData } from '@/components/molecules/Images/InputImages'
import type { User } from '@/types'

export class Command {
  constructor(
    /** ユーザーID */
    public readonly userId: User['id'],
    /** メールアドレス */
    public readonly email: string,
    /** プロフィール画像 */
    public readonly images: FileData[],
    /** 新パスワード */
    public readonly newPassword?: string,
    /** 新確認パスワード */
    public readonly newPasswordConfirm?: string,
    /** ユーザー名 */
    public readonly username?: string,
    /** ユーザー表示名 */
    public readonly displayName?: string,
    /** 説明 */
    public readonly description?: string,
  ) {}
}
