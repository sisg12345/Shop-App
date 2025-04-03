import 'server-only'

import type { ProductCategory, ProductCondition } from '@/types'

/**
 * 商品新規登録DTO
 */
export class CreateProductDto {
  constructor(
    /** 商品ID */
    public id: number | undefined,
    /** カテゴリー */
    public category: ProductCategory,
    /** 説明 */
    public description: string,
    /** タイトル */
    public title: string,
    /** 画像URL */
    public imageUrl: string,
    /** 値段 */
    public price: number,
    /** 状態 */
    public condition: ProductCondition,
    /** 所有者ID */
    public ownerId: number,
  ) {}
}
