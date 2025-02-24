import 'server-only'

import { FileUploadError } from '@/server/shared/Errors/FIleUpLoadError'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { IProductService } from '@/server/domain/interfaces/services/IProductService'
/**
 * 商品サービスクラス
 */
export class ProductService implements IProductService {
  /**
   * ファイルをアップロード
   * WARNING: 本来クラウドストレージに保存すべき処理だけど、簡易的な実装なためクラウドストレージとの連携は割愛
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
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        imageUrl = resolve(
          process.cwd(),
          './uploads',
          `${crypto.randomUUID()}.${file.name.split('.').pop()}`,
        )
        // ファイルをディレクトリに保存
        await fs.writeFile(imageUrl, buffer)
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
