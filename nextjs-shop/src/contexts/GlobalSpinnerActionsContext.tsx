'use client'

import { createContext, useContext, useState } from 'react'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

/**
 * グローバルスピナーコンテキスト
 *  スピナーの表示 / 非表示
 */
const GlobalSpinnerContext = createContext<boolean>(false)

/**
 * グローバルスピナーアクションコンテキスト
 *  スピナーの表示 / 非表示のアクション
 */
const GlobalSpinnerActionsContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {})

/**
 * グローバルスピナーコンテキストプロバイダー
 */
export function GlobalSpinnerContextProvider({ children }: PropsWithChildren) {
  // スピナーの状態
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false)

  return (
    <GlobalSpinnerContext value={isGlobalSpinnerOn}>
      <GlobalSpinnerActionsContext value={setGlobalSpinner}>{children}</GlobalSpinnerActionsContext>
    </GlobalSpinnerContext>
  )
}

/**
 * グローバルスピナーコンテキストのフック
 */
export const useGlobalSpinnerContext = (): boolean => useContext<boolean>(GlobalSpinnerContext)

/**
 * グローバルスピナーアクションコンテキストフック
 */
export const useGlobalSpinnerActionsContext = (): Dispatch<SetStateAction<boolean>> =>
  useContext<Dispatch<SetStateAction<boolean>>>(GlobalSpinnerActionsContext)
