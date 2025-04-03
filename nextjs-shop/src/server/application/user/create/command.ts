import 'server-only'

import type { User } from '@/types'

export class Command {
  constructor(
    /** ユーザーID */
    public readonly userId: User['id'],
    /** メールアドレス */
    public readonly email: string,
    /** パスワード */
    public readonly password: string,
    /** 確認パスワード */
    public readonly passwordConfirm: string,
  ) {}
}
