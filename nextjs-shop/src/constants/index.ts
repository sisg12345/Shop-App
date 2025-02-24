import type { ProductCategory, ProductCondition } from '@/types'

// 画面名
export const PAGE_NAME = {
  top: 'トップ',
  search: '検索',
} as const

// 商品カテゴリー
export const PRODUCT_CATEGORY_NAME: Record<ProductCategory | 'all', string> = {
  all: 'すべて',
  clothes: 'トップス',
  book: '本',
  shoes: 'シューズ',
} as const

// 商品の状態
export const PRODUCT_CONDITION: Record<ProductCondition, string> = {
  /** 新本 */
  new: '新品',
  /** 中古 */
  used: '中古',
} as const

// メッセージ
export const MESSAGE = {
  // 成功
  success: '処理が完了しました',
  // 失敗
  failure: '処理が失敗しました',
  // エラー
  error: {
    // ファイルアップロード
    fileUpLoad: 'ファイルアップロード中にエラーが発生しました',
    // データベース
    database: 'データベースエラー',
    // 認証
    credentialsSignin: 'サインイン認証に失敗しました',
  },
}
