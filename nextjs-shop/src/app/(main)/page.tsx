import Banner from './Banner'
import Products from './Products'
import Box from '@/components/layouts/Box'
import { searchProducts } from '@/lib/services/products/search-products'
import type { Product } from '@/types'

export default async function HomePage() {
  // 各カテゴリーのトップ6件を取得
  const [clothesProducts, bookProducts, shoesProducts] = await Promise.all([
    searchProducts<Product[]>({ category: 'clothes', limit: 6, page: 1 }),
    searchProducts<Product[]>({ category: 'book', limit: 6, page: 1 }),
    searchProducts<Product[]>({ category: 'shoes', limit: 6, page: 1 }),
  ])

  return (
    <Box as="main">
      {/* バナー */}
      <Banner />
      {/* 商品一覧 */}
      <Products
        clothesProducts={clothesProducts}
        bookProducts={bookProducts}
        shoesProducts={shoesProducts}
      />
    </Box>
  )
}
