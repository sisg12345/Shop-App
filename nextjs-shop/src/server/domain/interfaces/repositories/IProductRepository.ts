import 'server-only'

import { ProductDto } from '@/server/domain/dtos/ProductDto'

/**
 * 商品レポジトリインターフェース
 */
export interface IProductRepository {
  /**
   * 保存
   *
   * @param product 商品DTO
   */
  save(product: Required<ProductDto>): Promise<void>
}
