import 'server-only'

import { MESSAGE } from '@/constants'

/**
 * DB全般のエラー
 */
export class DatabaseError extends Error {
  constructor(message = MESSAGE.error.database) {
    super(message)
    this.name = 'DatabaseError'
  }
}
