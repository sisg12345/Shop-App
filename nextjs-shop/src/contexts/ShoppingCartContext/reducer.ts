import { Product } from '@/types'

// 商品追加
export const ADD_PRODUCT = 'ADD_PRODUCT'
// 商品削除
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * 商品追加アクション
 *
 * @param product 商品ID
 * @param state 現在の状態
 * @returns 次の状態
 */
const addProductToCart = (product: Product, state: Product[]) => {
  // データを追加した新しい状態を返却
  return [...state, product]
}

/**
 * 商品削除アクション
 *
 * @param productId 商品ID
 * @param state 現在の状態
 * @returns 次の状態
 */
const removeProductFromCart = (productId: number, state: Product[]) => {
  // 削除対象データのインデックスを取得
  const removeItemIndex = state.findIndex((item) => item.id === productId)

  // 新しい状態
  const newState = [...state]
  // 新しい状態からデータを対象削除
  newState.splice(removeItemIndex, 1)

  // 新しい状態を編曲
  return newState
}

type ShopReducerAction =
  | { type: typeof ADD_PRODUCT; payload: Product }
  | { type: typeof REMOVE_PRODUCT; payload: number }

export default function shopReducer(state: Product[], action: ShopReducerAction) {
  switch (action.type) {
    // 商品追加
    case ADD_PRODUCT:
      return addProductToCart(action.payload, state)
    // 商品削除
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.payload, state)
  }
}
