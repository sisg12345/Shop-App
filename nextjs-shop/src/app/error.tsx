'use client' // エラーバウンダリはクライアントコンポーネントである必要があります

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーをエラー報告サービスにログ出力
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>何か問題が発生しました！</h2>
      <button
        onClick={
          // セグメントを再レンダリングすることで復旧を試みます
          () => reset()
        }
      >
        再試行
      </button>
    </div>
  )
}
