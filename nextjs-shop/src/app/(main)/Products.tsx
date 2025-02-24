import Link from 'next/link'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import ProductCard from '@/components/organisms/Cards/ProductCard'
import ProductCarousel from '@/components/organisms/Carousels/ProductCarousel'
import { PRODUCT_CATEGORY_NAME } from '@/constants'
import type { Product } from '@/types'

type ProductsProps = {
  /** 服一覧 */
  clothesProducts: Product[]
  /** 本一覧 */
  bookProducts: Product[]
  /** 靴一覧 */
  shoesProducts: Product[]
}

/**
 * 商品カードカルーセルをレンダリング
 * @param product 商品一覧
 */
const renderProductCardCarousel = (product: Product[]) => {
  return (
    <ProductCarousel>
      {product.map((product: Product) => (
        <Box $padding={1} key={product.id}>
          <Link href={`/product/${product.id}`}>
            <ProductCard
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              blurDataUrl={product.blurDataUrl}
              $variant="small"
            />
          </Link>
        </Box>
      ))}
    </ProductCarousel>
  )
}

/**
 * 商品一覧
 */
export default function Products({ clothesProducts, bookProducts, shoesProducts }: ProductsProps) {
  return (
    <section>
      <Flex $justifyContent="center" $paddingTop={2} $paddingBottom={2}>
        <Box $paddingLeft={2} $paddingRight={2} $width="100%">
          {/* トップス一覧 */}
          <Box $marginBottom={3}>
            <Text as="h2" $variant="large">
              {PRODUCT_CATEGORY_NAME.clothes}
            </Text>
            {renderProductCardCarousel(clothesProducts)}
          </Box>
          {/* 本覧 */}
          <Box $marginBottom={3}>
            <Text as="h2" $variant="large">
              {PRODUCT_CATEGORY_NAME.book}
            </Text>
            {renderProductCardCarousel(bookProducts)}
          </Box>
          {/* シューズ一覧 */}
          <Box $marginBottom={3}>
            <Text as="h2" $variant="large">
              {PRODUCT_CATEGORY_NAME.shoes}
            </Text>
            {renderProductCardCarousel(shoesProducts)}
          </Box>
        </Box>
      </Flex>
    </section>
  )
}
