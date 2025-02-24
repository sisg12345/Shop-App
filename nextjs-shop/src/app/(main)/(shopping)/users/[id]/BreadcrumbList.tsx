import Breadcrumb from '@/components/molecules/Breadcrumbs/Breadcrumb'
import { PAGE_NAME } from '@/constants'
import { User } from '@/types'

type BreadcrumbList = {
  /** ユーザーID */
  userId?: User['id']
}

/**
 * パンくずリスト
 */
export default function BreadcrumbList({ userId }: BreadcrumbList) {
  // パンくずリスト
  const breadcrumbsInfo = [{ href: '/', label: PAGE_NAME.top as string }]
  // カテゴリーをパンくずリストに追加
  if (userId !== undefined) {
    breadcrumbsInfo.push({ href: '', label: userId.toString() })
  }

  return <Breadcrumb breadcrumbsInfo={breadcrumbsInfo} />
}
