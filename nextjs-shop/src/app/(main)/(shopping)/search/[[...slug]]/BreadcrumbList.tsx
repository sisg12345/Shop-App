import Breadcrumb from '@/components/molecules/Breadcrumbs/Breadcrumb'
import { PAGE_NAME, PRODUCT_CATEGORY_NAME } from '@/constants'
import type { ProductCategory } from '@/types'

type BreadcrumbListProps = {
  /** 商品カテゴリー */
  category?: ProductCategory
}

/**
 * パンくずリスト
 */
export default function BreadcrumbList({ category }: BreadcrumbListProps) {
  // パンくずリスト
  const breadcrumbsInfo = [
    { href: '/', label: PRODUCT_CATEGORY_NAME.all },
    { href: '/search', label: PAGE_NAME.search },
  ]
  // カテゴリーをパンくずリストに追加
  if (category !== undefined) {
    breadcrumbsInfo.push({ href: `/search${category}`, label: PRODUCT_CATEGORY_NAME[category] })
  }

  return <Breadcrumb breadcrumbsInfo={breadcrumbsInfo} />
}
