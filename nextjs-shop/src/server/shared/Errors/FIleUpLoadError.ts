import 'server-only'

import { MESSAGE } from '@/constants'

/**
 * ファイルアップロードエラー
 */
export class FileUploadError extends Error {
  constructor(message = MESSAGE.error.fileUpLoad) {
    super(message)
    this.name = 'FileUploadError'
  }
}
