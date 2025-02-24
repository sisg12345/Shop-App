'use client'

import { PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'
import { fetcher } from '@/utils/fetch/fetcher'

/**
 * SWRプロバイダー
 * NOTE: layoutファイルの中で直接呼び出すとエラーなるので、切り出して定義している
 */
export default function SWRClient({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  )
}
