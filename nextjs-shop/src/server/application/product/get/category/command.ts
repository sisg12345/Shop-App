import 'server-only'

import type { ProductCategory } from '@/types'
import { baseCommand } from '@/server/application/common/baseCommand'

export class Command extends baseCommand {
  /** 商品カテゴリー */
  public readonly category: ProductCategory | null

  constructor(
    category: ProductCategory | null,
    page: string | null,
    limit: string | null,
    sort: string | null,
    order: string | null,
  ) {
    const _page = page != null ? Number(page) : null
    const _limit = limit != null ? Number(limit) : null

    super(_page, _limit, sort, order)
    this.category = category
  }
}
