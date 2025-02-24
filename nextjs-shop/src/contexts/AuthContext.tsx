'use client'

import { createContext, PropsWithChildren, startTransition, useContext } from 'react'
import useSWR from 'swr'
import signin from '@/lib/services/auth/signin'
import signout from '@/lib/services/auth/signout'
import type { ApiContext, User } from '@/types'

type AuthContextType = {
  /** 認証ユーザー */
  authUser?: User
  /** ローディング */
  isLoading: boolean
  /** サインイン */
  signin: (username: string, password: string) => Promise<void>
  /** サインアウト */
  signout: () => Promise<void>
  /** ミューテート */
  mutate: (data?: User | Promise<User>, shouldRevalidate?: boolean) => Promise<User | undefined>
}

/**
 * 認証コンテキスト
 */
const AuthContext = createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
})

type AuthContextProviderProps = {
  // APIコンテキスト
  context: ApiContext
  /** 認証ユーザー */
  authUser?: User
}

/**
 * 認証コンテキストプロバイダー
 */
export function AuthContextProvider({
  context,
  authUser,
  children,
}: PropsWithChildren<AuthContextProviderProps>) {
  // TODO: コメント
  const { data, error, mutate } = useSWR<User>(`${context.apiRootUrl}/users/me`)
  // ローディング
  const isLoading = !data && !error

  /**
   * サインイン
   *
   * @param username ユーザー名
   * @param password ユーザーパスワード
   */
  const signinInternal = async (username: string, password: string) => {
    await signin(context, { username, password })
    // TODO: なぜ必要
    await mutate()
  }
  /**
   * サインアウト
   */
  const signoutInternal = async () => {
    await signout(context)
    await mutate()
  }

  return (
    <AuthContext
      value={{
        authUser: data ?? authUser,
        isLoading,
        signin: signinInternal,
        signout: signoutInternal,
        mutate,
      }}
    >
      {children}
    </AuthContext>
  )
}

/**
 * 認証コンテキストフック
 */
export const useAuthContext = (): AuthContextType => useContext<AuthContextType>(AuthContext)
