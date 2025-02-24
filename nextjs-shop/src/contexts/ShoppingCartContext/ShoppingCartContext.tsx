'use client'

import type { PropsWithChildren } from 'react'
import { createContext, useContext, useReducer } from 'react'
import shopReducer, { ADD_PRODUCT, REMOVE_PRODUCT } from './reducer'
import { Product } from '@/types'

type ShoppingCartContextType = {
  /** カート */
  cart: Product[]
  /** 表品をカートに追加 */
  addProductToCart: (product: Product) => void
  /** 商品をカートから削除 */
  removeProductFromCart: (productId: number) => void
}

/**
 * ショッピングカートコンテキスト
 */
const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
})

/**
 * ショッピングカートコンテキストプロバイダー
 */
export function ShoppingCarContextProvider({ children }: PropsWithChildren) {
  // カートの商品
  const products: Product[] = []
  // カートのリデューサー
  const [cartState, dispatch] = useReducer(shopReducer, products)

  /**
   * 商品をカートに追加
   * @param product 商品
   */
  const addProductToCart = (product: Product) => {
    dispatch({ type: ADD_PRODUCT, payload: product })
  }

  /**
   * 商品をカートから削除
   * @param productId 商品ID
   */
  const removeProductFromCart = (productId: number) => {
    dispatch({ type: REMOVE_PRODUCT, payload: productId })
  }

  return (
    <ShoppingCartContext
      value={{
        cart: cartState,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </ShoppingCartContext>
  )
}

/**
 * ショッピングカートコンテキストのフック
 */
export const useShoppingCartContext = (): ShoppingCartContextType =>
  useContext<ShoppingCartContextType>(ShoppingCartContext)
