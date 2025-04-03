/**
 * fetchをラップした関数
 * 指定されたリソースに対してHTTPリクエストを行い、レスポンスをJSONとして返す
 * レスポンスが失敗した場合は、エラーメッセージを含む例外を投げる
 *
 * @param resource リクエストするリソースのURLまたはRequestオブジェクト
 * @param init リクエストの初期化オプション
 * @returns レスポンスのJSONデータ
 * @throws レスポンスが失敗した場合にエラーメッセージを含む例外を投げる
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const fetcher = async <T>(resource: RequestInfo, init?: RequestInit): Promise<T> => {
  // リソースに対してHTTPリクエストを行う
  const response = await fetch(resource, init)
  console.log('fetcher...', resource)

  // レスポンスが失敗した場合
  if (!response.ok) {
    // レスポンスのJSONデータを取得
    const errorResponse = await response.json()
    // エラーメッセージを含む例外を作成
    const error = new Error(errorResponse.message ?? 'APIリクエスト中にエラーが発生しました。')

    // 例外を投げる
    throw error
  }

  // レスポンスのJSONデータを返す
  return response.json()
}
