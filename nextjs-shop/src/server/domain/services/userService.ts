import 'server-only'
import { IUserService } from '../interfaces/services/IUserService'
import bcrypt from 'bcryptjs'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'

export class UserService implements IUserService {
  /**
   * パスワードを暗号化
   *
   * @param password パスワード
   * @returns 暗号化されたパスワード
   */

  public async encryptPassword(password: string): Promise<string> {
    // ラウンド数
    const saltRounds = 10
    // パスワードハッシュ化
    const encryptedPassword = bcrypt.hash(password, saltRounds)

    return encryptedPassword
  }

  /**
   * ファイルをアップロード
   * WARNING: 本来クラウドストレージに保存すべき処理なので、ダミー処理を実装している
   *
   * @param file ファイルオブジェクト
   * @returns 画像URL
   */
  public async fileUpload(file?: File): Promise<string | void> {
    try {
      // 画像URL
      let imageUrl

      // ファイルが存在する場合、ファイルを保存
      if (file && file.size > 0) {
        // ファイル名を生成...
        // ファイル転送処理...
        // ファイルURLを生成...
        imageUrl = '/placeholder-125.png'
      } else {
        // ファイルアップロード例外をスロー
        throw new FileUploadError()
      }

      return imageUrl
    } catch (error) {
      if (error instanceof Error) {
        // ファイルアップロード例外をスロー
        throw new FileUploadError()
      }
    }
  }
}
