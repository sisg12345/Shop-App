/**
 * 通信レスポンス
 */
export type ResponseResult<T = {}> = {
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
  /** 取得データ */
  data?: T
}

/**
 * HTTPメソッド
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
