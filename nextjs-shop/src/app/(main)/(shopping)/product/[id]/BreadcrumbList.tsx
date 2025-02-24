import Breadcrumb from '@/components/molecules/Breadcrumbs/Breadcrumb'
import { PAGE_NAME, PRODUCT_CATEGORY_NAME } from '@/constants'
import type { Product, ProductCategory } from '@/types'

type BreadcrumbListProps = {
  /** 商品カテゴリー */
  category: ProductCategory
  /** タイトル */
  title: Product['title']
}

/**
 * パンくずリスト
 */
export default function BreadcrumbList({ category, title }: BreadcrumbListProps) {
  // パンくずリスト
  const breadcrumbsInfo = [
    { href: '/', label: PAGE_NAME.top },
    { href: '/search', label: PAGE_NAME.search },
    { href: `/search/${category}`, label: PRODUCT_CATEGORY_NAME[category] },
    { href: '', label: title },
  ]

  return <Breadcrumb breadcrumbsInfo={breadcrumbsInfo} />
}
