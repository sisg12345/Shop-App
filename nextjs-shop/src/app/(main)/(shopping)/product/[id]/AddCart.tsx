'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/atoms/Buttons/Button'
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext/ShoppingCartContext'
import type { Product } from '@/types'

type AddCartProps = {
  /** 追加される商品 */
  product: Product
  // ルート情報
  routeInfo: {
    /** 画面遷移先パス */
    pathname: string
  }
}

/**
 * カートに商品を追加
 *
 * @param product 商品
 * @param pushPath 商品追加処理後の画面遷移先のパス
 */
export default function AddCart({ product, routeInfo }: AddCartProps) {
  // ルーターフック
  const router = useRouter()
  // ショッピングカートコンテキストのフック
  const { cart, addProductToCart } = useShoppingCartContext()

  /**
   * カートに追加ボタンをクリックした時のハンドラー
   *
   * @param productId 商品ID
   */
  const handleAddToCartButtonClick = (productId: number) => {
    // カートから対象商品を取得
    const result = cart.findIndex((value) => value.id === productId)

    // 商品がカートにない場合は追加する
    if (result === -1) {
      addProductToCart(product)
    }

    // カート確認画面に遷移
    router.push(routeInfo.pathname)
  }

  return (
    <Button
      $width={{ base: '100%', md: '400px' }}
      $height="66px"
      onClick={() => handleAddToCartButtonClick(product.id)}
    >
      カートに追加
    </Button>
  )
}
