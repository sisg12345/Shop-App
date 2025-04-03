import 'server-only'

/**
 * ユーザーサービスインターフェース
 */
export interface IUserService {
  /**
   * パスワードを暗号化
   *
   * @param password パスワード
   * @returns 暗号化されたパスワード
   */
  encryptPassword(password: string): Promise<string>

  /**
   * ファイルをアップロード
   * WARNING: 本来クラウドストレージに保存すべき処理なので、ダミー処理を実装している
   *
   * @param file ファイルオブジェクト
   * @returns 画像URL
   */
  fileUpload(file?: File): Promise<string | void>
}
