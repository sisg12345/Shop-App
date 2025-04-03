import 'server-only'

import type { ProductCategory, ProductCondition, User } from '@/types'

/**
 * 商品エンティティ
 */
export class ProductEntity {
  constructor(
    /** 商品ID */
    public id: number,
    /** カテゴリー */
    public category: ProductCategory,
    /** タイトル */
    public title: string,
    /** 説明 */
    public description: string,
    /** 値段 */
    public price: number,
    /** 状態 */
    public condition: ProductCondition,
    /** 画像URL */
    public imageUrl: string,
    /** 所有者ID */
    public ownerId: number,
    /** 作成ユーザー */
    public createUser: User['id'],
    /** 作成日付 */
    public createDate: Date,
    /** 更新ユーザー */
    public updateUser: User['id'],
    /** 更新日付 */
    public updateData: Date,
  ) {}
}
