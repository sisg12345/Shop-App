import Banner from './Banner'
import Products from './Products'
import Box from '@/components/layouts/Box'
import { searchProducts } from '@/lib/services/products/search-products'
import type { Product, ResponseResult } from '@/types'

export default async function HomePage() {
  // 各カテゴリーのトップ6件を取得
  const [clothesProducts, bookProducts, shoesProducts] = await Promise.all([
    searchProducts<ResponseResult<Product[] | []>>({ category: 'clothes', limit: 6, page: 1 }),
    searchProducts<ResponseResult<Product[] | []>>({ category: 'book', limit: 6, page: 1 }),
    searchProducts<ResponseResult<Product[] | []>>({ category: 'shoes', limit: 6, page: 1 }),
  ])

  return (
    <Box as="main">
      {/* バナー */}
      <Banner />
      {/* 商品一覧 */}
      <Products
        clothesProducts={clothesProducts.data!}
        bookProducts={bookProducts.data!}
        shoesProducts={shoesProducts.data!}
      />
    </Box>
  )
}
