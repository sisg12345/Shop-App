'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/themes'

/**
 * テーマプロバイダー
 * NOTE: layoutファイルの中で直接呼び出すとエラーなるので、切り出して定義している
 */
export default function ThemeClient({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
