import { Fragment } from 'react'
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
    <ProductCardList numberPerRow={6} numberPerRowForMobile={2}>
      {products.map(({ id, title, price, imageUrl }) => (
        <Fragment key={id}>
          {/* 商品カード */}
          <ProductCard $variant="small" title={title} price={price} imageUrl={imageUrl} />
        </Fragment>
      ))}
    </ProductCardList>
  )
}
