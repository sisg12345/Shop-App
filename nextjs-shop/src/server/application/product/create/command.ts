import 'server-only'

import type { Product, ProductCategory, ProductCondition, User } from '@/types'
import type { FileData } from '@/components/molecules/Images/InputImages'

export class Command {
  constructor(
    /** ユーザーID */
    public readonly userId: User['id'],
    /** 商品タイトル */
    public readonly title: string,
    /** 商品価格 */
    public readonly price: Product['price'],
    /** 商品画像 */
    public readonly images: FileData[],
    /** 商品カテゴリー */
    public readonly category: ProductCategory,
    /** 商品の状態 */
    public readonly condition: ProductCondition,
    /** 商品の説明 */
    public readonly description: string,
  ) {}
}
