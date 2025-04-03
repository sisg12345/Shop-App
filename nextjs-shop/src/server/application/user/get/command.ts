import 'server-only'

import type { User } from '@/types'

export class Command {
  constructor(
    /** ユーザーID */
    public readonly userId: User['id'],
  ) {}
}
