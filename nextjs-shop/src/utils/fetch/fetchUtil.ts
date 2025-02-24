/**
 * リクエストパスを組み立てる
 *
 * @param path リクエスト先のパス
 * @param searchParams クエリ
 * @returns リクエストパス
 */
export const buildRequestPath = (path: string, searchParams: URLSearchParams) => {
  const query = searchParams.toString()

  return query.length > 0 ? `${path}?${query}` : path
}
