import 'server-only'

/**
 * 商品サービスインターフェース
 */
export interface IProductService {
  /**
   * ファイルアップロード
   *
   * @param file ファイルオブジェクト
   * @returns 画像URL
   */
  fileUpload(file?: File): Promise<string | void>
}
