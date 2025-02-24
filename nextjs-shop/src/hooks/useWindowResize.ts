'use client'

import { useEffect, useState } from 'react'

/**
 * 画面のサイズの変更を検知
 *
 * @returns 画面サイズ
 */
export function useWindowResize() {
  // 画面サイズ
  const [windowSize, setWindowSize] = useState<{
    windowWidth?: number
    windowHeight?: number
  }>({
    windowWidth: undefined,
    windowHeight: undefined,
  })

  useEffect(() => {
    /**
     * 画面リサイズのハンドラー
     */
    const handleResize = () => {
      setWindowSize({ windowWidth: window.innerWidth, windowHeight: window.innerHeight })
    }

    // 画面リサイズ検知イベント登録
    window.addEventListener('resize', handleResize, false)

    return () => {
      // 画面リサイズ検知イベント削除
      window.removeEventListener('resize', handleResize, false)
    }
  }, [])

  // 画面サイズ
  return {
    ...windowSize,
  }
}
