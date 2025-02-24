'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type BreadcrumbContextType = {
  /** 遷移先パス */
  href: string
  /** 遷移先名 */
  label: string
}[]

/**
 * パンくずリストコンテキスト
 */
const BreadcrumbContext = createContext<BreadcrumbContextType>([])

type BreadcrumbActionsContextType = Dispatch<SetStateAction<BreadcrumbContextType>>

/**
 *
 * パンくずリストアクションコンテキスト
 */
const BreadcrumbActionsContext = createContext<BreadcrumbActionsContextType>(() => {})

/**
 * パンくずリストコンテキストプロバイダー
 */
export function BreadcrumbContextProvider({ children }: PropsWithChildren) {
  // パンくずリストの状態
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbContextType>([])

  return (
    <BreadcrumbContext value={breadcrumb}>
      <BreadcrumbActionsContext value={setBreadcrumb}>{children}</BreadcrumbActionsContext>
    </BreadcrumbContext>
  )
}

/**
 * パンくずリストコンテキスフック
 */
export const useBreadcrumbContext = (): BreadcrumbContextType =>
  useContext<BreadcrumbContextType>(BreadcrumbContext)

/**
 *
 * パンくずリストアクションコンテキストフック
 */
export const useBreadcrumbActionsContext = (): Dispatch<SetStateAction<BreadcrumbContextType>> =>
  useContext<Dispatch<SetStateAction<BreadcrumbContextType>>>(BreadcrumbActionsContext)
