import 'server-only'

import { MESSAGE } from '@/constants'

/**
 * 既に存在するエラー
 */
export class ExistError extends Error {
  constructor(message = MESSAGE.error.Exist) {
    super(message)
    this.name = 'ExistError'
  }
}
