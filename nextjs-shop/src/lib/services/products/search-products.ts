import type { Product, ProductCategory, ProductCondition } from '@/types'
import { buildRequestPath } from '@/utils/fetch/fetchUtil'
import { fetcher } from '@/utils/fetch/fetcher'

type SearchProducts = {
  /** 商品カテゴリー */
  category?: ProductCategory
  /** 商品の状態 */
  conditions?: ProductCondition[]
  /** ユーザーID */
  userId?: number
  /** ページ */
  page?: number
  /** 件数 */
  limit?: number
  /** ソート */
  sort?: keyof Omit<Product, 'owner'>
  /** 順序 */
  order?: 'asc' | 'desc'
}

/**
 * 商品一覧を取得
 *
 * @param param 検索条件
 */
export const searchProducts = async <T>({
  category,
  conditions,
  userId,
  page,
  limit,
  sort = 'id',
  order = 'desc',
}: SearchProducts): Promise<T> => {
  // 検索パラメーター
  const params = new URLSearchParams()
  category && params.append('category', category)
  conditions && conditions.forEach((condition) => params.append('condition', condition))
  userId && params.append('owner.id', userId.toString())
  page && params.append('_page', page.toString())
  limit && params.append('_limit', limit.toString())
  sort && params.append('_sort', sort)
  order && params.append('_order', order)

  // リクエストパスを組み立てる
  const path = buildRequestPath(
    `${process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_PATH || 'http://localhost:3000'}/products`,
    params,
  )

  // 商品一覧を取得
  return await fetcher(path)
}
