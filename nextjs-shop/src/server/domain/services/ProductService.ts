import 'server-only'

import { IProductService } from '@/server/domain/interfaces/services/IProductService'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'

/**
 * 商品サービスクラス
 */
export class ProductService implements IProductService {
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
        imageUrl = '/placeholder-200.png'
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
