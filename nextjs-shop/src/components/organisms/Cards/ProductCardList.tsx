import type { PropsWithChildren } from 'react'
import Grid from '@/components/layouts/Gird'

type ProductCardListProps = {
  /** 1行に表示する商品数 */
  numberPerRow?: number
  /** モバイルで1行に表示する商品数 */
  numberPerRowForMobile?: number
}

/**
 * 商品カードリスト
 */
export default function ProductCardList({
  numberPerRow = 4,
  numberPerRowForMobile = 2,
  children,
}: PropsWithChildren<ProductCardListProps>) {
  return (
    <Grid
      $gridGap="16px"
      $gridTemplateColumns={{
        base: `repeat(${numberPerRowForMobile}, 1fr)`,
        md: `repeat(${numberPerRow}, 1fr)`,
      }}
    >
      {children}
    </Grid>
  )
}
