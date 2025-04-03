import 'server-only'

import { CreateProductDto } from '@/server/domain/dtos/createProductDto'
import type { ProductCategory } from '@/types'
import { ProductEntity } from '@/server/domain/entities/productEntity'

/**
 * 商品レポジトリインターフェース
 */
export interface IProductRepository {
  /**
   * 商品を保存
   *
   * @param product 商品DTO
   */
  save(product: Required<CreateProductDto>): Promise<void>

  /**
   * カテゴリーから商品を取得
   *
   * @param category  カテゴリー
   * @param page  ページ
   * @param limit 件数
   * @param sort  ソート
   * @param order 順序
   */
  findByCategory(
    category: ProductCategory | null,
    page: number | null,
    limit: number | null,
    sort: string | null,
    order: string | null,
  ): Promise<ProductEntity[] | []>
}
