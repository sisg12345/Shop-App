import Link from 'next/link'
import ProductListLoading from './ProductListLoading'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import ProductCard from '@/components/organisms/Cards/ProductCard'
import ProductCardList from '@/components/organisms/Cards/ProductCardList'
import type { Product } from '@/types'

type ProductListProps = {
  /** 商品一覧 */
  products: Product[]
}

/**
 * 商品一覧
 */
export default function ProductList({ products }: ProductListProps) {
  return (
    <Box>
      {/* タイトル */}
      <Text
        as="h2"
        $variant="mediumLarge"
        $display={{ base: 'block', md: 'none' }}
        $fontWeight="bold"
        $paddingBottom={1}
      >
        商品一覧
      </Text>
      {/* 商品カード一覧 */}
      <ProductCardList>
        {/*  */}
        {products &&
          products.map(({ id, title, price, imageUrl, blurDataUrl }) => (
            <Box key={id}>
              <Link href={`/product/${id}`}>
                <ProductCard
                  $variant="listing"
                  title={title}
                  price={price}
                  imageUrl={imageUrl}
                  blurDataUrl={blurDataUrl}
                />
              </Link>
            </Box>
          ))}
        {/* 商品一覧のローティイグ中に表示するコンテンツ */}
        {products.length === 0 && <ProductListLoading />}
      </ProductCardList>
    </Box>
  )
}
