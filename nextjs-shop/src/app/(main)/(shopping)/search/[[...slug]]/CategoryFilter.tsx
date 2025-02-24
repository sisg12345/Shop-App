'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import FilterGroup from '@/components/molecules/Filters/FilterGroup'
import { PRODUCT_CATEGORY_NAME, PRODUCT_CONDITION } from '@/constants'
import { buildRequestPath } from '@/utils/fetch/fetchUtil'

// カテゴリー
const categoryList = {
  clothes: PRODUCT_CATEGORY_NAME.clothes,
  book: PRODUCT_CATEGORY_NAME.book,
  shoes: PRODUCT_CATEGORY_NAME.shoes,
}

interface CategoryFilterProps {
  /** 値 */
  value?: []
  /** ルート情報 */
  routeInfo: {
    /** 遷移先画面パス */
    pathname: string
  }
}

/**
 * カテゴリーフィルター
 */
export default function CategoryFilter({ value, routeInfo }: CategoryFilterProps) {
  // ルーターフック
  const router = useRouter()
  // ルート情報
  const { pathname } = routeInfo

  /**
   * 商品状態選択された時のハンドラー
   *
   * @param selected 選択された商品の状態
   */
  const onChange = (selectedCondition: string[]) => {
    // パラメーター
    const params = new URLSearchParams()
    selectedCondition &&
      selectedCondition.forEach((condition) => params.append('condition', condition))
    // ルーターのpush先パス
    const path = buildRequestPath(pathname, params)

    // 画面遷移
    router.push(path)
  }

  return (
    <Box as="aside" $minWidth="200px" $marginBottom={{ base: 2, md: 0 }}>
      <FilterGroup
        title={'商品の状態'}
        items={[
          { label: PRODUCT_CONDITION.new, name: 'new' },
          { label: PRODUCT_CONDITION.used, name: 'used' },
        ]}
        value={value}
        onChange={onChange}
      />
      <Box $paddingTop={2}>
        <Text as="h2" $variant="mediumLarge" $fontWeight="bold" $paddingBottom={1}>
          カテゴリー
        </Text>
        <Box>
          <Link href="/search">{PRODUCT_CATEGORY_NAME.all}</Link>
          {Object.keys(categoryList).map((category: string) => (
            <Box key={category}>
              <Link href={`/search/${category}`}>
                {categoryList[category as keyof typeof categoryList]}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
