'use client'

import { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'
import type { IContentLoaderProps } from 'react-content-loader'

interface RectLoaderProps extends IContentLoaderProps {
  /** 横幅 */
  $width: number
  /** 縦幅 */
  $height: number
}

/**
 * レクトローダー
 */
export default function RectLoader({ $width, $height, ...rest }: RectLoaderProps) {
  // WARING: hydratedエラー対策
  // クライアントサイド状態
  const [isClient, setIsClient] = useState(false)

  /**
   * WARING: hydratedエラー対策
   * useEffectを使うことでクライアントサイドでのみ実行されるように制御
   */
  useEffect(() => {
    setIsClient(true)
  }, [])
  // WARING: hydratedエラー対策
  if (!isClient) {
    return null
  }

  return (
    <ContentLoader
      speed={2}
      width={$width}
      height={$height}
      viewBox={`0 0 ${$width} ${$height}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...rest}
    >
      <rect x="0" y="0" rx="0" ry="0" width={$width} height={$height} />
    </ContentLoader>
  )
}
