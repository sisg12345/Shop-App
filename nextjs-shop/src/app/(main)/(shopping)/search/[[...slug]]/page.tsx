'use client'

import { use, useEffect, useState } from 'react'
import BreadcrumbList from './BreadcrumbList'
import CategoryFilter from './CategoryFilter'
import ProductList from './ProductList'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import { searchProducts } from '@/lib/services/products/search-products'
import type { Product, ProductCategory, ProductCondition } from '@/types'

type SearchPageProps = {
  /** パラメーター */
  params: Promise<{ slug: ProductCategory[] }>
  /** クエリ */
  searchParams: Promise<Record<string, ProductCondition[]>>
}

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  console.log('SearchPage render...')

  // パラメーター
  const { slug } = use(params)
  // クエリから商品の状態を取得
  const { condition: query } = use(searchParams)

  // 商品状態を配列に変換
  const conditions = (() => {
    if (Array.isArray(query)) {
      return query
    }
    if (query) {
      return [query]
    }

    return []
  })()
  // 商品カテゴリー
  const category = slug?.length > 0 ? slug[slug.length - 1] : undefined
  // 商品一覧
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    /**
     * データ取得処理
     */
    const fetchData = async () => {
      // 商品一覧取得
      const products = await searchProducts<Product[]>({ category, conditions, limit: 20, page: 1 })
      // 商品一覧の状態をセット
      setProducts(products)
    }

    // データ取得処理十国
    fetchData()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [slug, query])

  return (
    <Box>
      {/* パンくずリスト */}
      <BreadcrumbList category={category} />
      <Flex as="main" $paddingTop={2}>
        <Flex $flexDirection={{ base: 'column', md: 'row' }}>
          {/* カテゴリーフィルター */}
          <CategoryFilter routeInfo={{ pathname: category ? `/search/${category}` : `/search` }} />
          {/* 商品一覧 */}
          <ProductList products={products} />
        </Flex>
      </Flex>
    </Box>
  )
}
