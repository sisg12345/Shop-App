/**
 * 通信レスポンス
 */
export type ResponseResult = {
  /** 成功フラグ */
  success: boolean
  /** メッセージ */
  message?: string | string[] // エラーのかたを作る
  /** バリデーションエラー */
  errors?: {
    [name: string]: {
      message: string
    }
  }
  /** ステータスコード */
  status?: number
}
