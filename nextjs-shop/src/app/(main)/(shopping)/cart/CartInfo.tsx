'use client'

import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import CartProduct from '@/components/organisms/Carts/CartProduct'
import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerActionsContext'
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext/ShoppingCartContext'
import type { AuthGuard, UseAuthGuard } from '@/hooks/useAuthGuard'
import { Product } from '@/types'
import { usePathname } from 'next/dist/client/components/navigation'

type PurchaseProduct = {
  productId: Product['id']
}

interface CartInfoProps {
  /** 認証ガード */
  useAuthGuard: (path: UseAuthGuard['path'], queryParams: UseAuthGuard['queryParams']) => AuthGuard
  /** 商品購入 */
  onPurchaseProduct: (params: PurchaseProduct) => Promise<{ message: string }>
}

/**
 * カート情報
 */
export default function CartInfo({ useAuthGuard, onPurchaseProduct }: CartInfoProps) {
  // ローディングスピナーアクションコンテキストのフック
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // ショッピングカートコンテキストのフック
  const { cart, removeProductFromCart } = useShoppingCartContext()
  // pathNameのフック
  const pathname = usePathname()
  // 認証ガード
  const { session, redirect } = useAuthGuard('/signin', { redirect_to: pathname.toString() })

  /**
   * 購入ボタンをクリックした時のハンドラー
   *
   * @param id 商品ID
   */
  const handleByButtonClick = async (id: number) => {
    try {
      // 認証されていなければサインイン画面に遷移
      if (!session) {
        redirect()

        return
      }

      // ローディングスピナー表示
      setGlobalSpinner(true)

      // 商品購入
      await onPurchaseProduct({ productId: id })
      // TODO
      window.alert('購入しました')
      // 商品購入後はカートから商品を削除
      removeProductFromCart(id)
    } catch (error: unknown) {
      if (error instanceof Error) {
        // TODO: 共通コンポーネントを作る -> error.js
        window.alert(error.message)
      }
    } finally {
      // ローディングスピナー非表示
      setGlobalSpinner(false)
    }
  }
  /**
   * 削除ボタンをクリックした時のハンドラー
   *
   * @param id 商品ID
   */
  const handleRemoveButtonClick = (id: number) => {
    // カートから商品を削除
    removeProductFromCart(id)
  }

  return (
    <>
      <Box $padding={2} $paddingBottom={2}>
        <Text as="h1" $variant="large" $display="block" $paddingBottom={2}>
          カート
        </Text>
        {cart.map(({ id, title, price, imageUrl }) => (
          <CartProduct
            id={id}
            title={title}
            price={price}
            imageUlr={imageUrl}
            onBuyButtonClick={handleByButtonClick}
            onRemoveButtonClick={handleRemoveButtonClick}
            key={id}
          />
        ))}
      </Box>
    </>
  )
}
