import { MESSAGE } from '@/constants'
import 'server-only'

/**
 * ファイルアップロードエラー
 */
export class FileUploadError extends Error {
  constructor(message = MESSAGE.error.fileUpLoad) {
    super(message)
    this.name = 'FileUploadError'
  }
}
