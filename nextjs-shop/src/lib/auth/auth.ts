import 'server-only'

import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import yup from '@/lib/yup'
import Credentials from 'next-auth/providers/credentials'
import prisma from '../prisma'
import bcrypt from 'bcryptjs'
import { signinFormSchema } from '../services/auth/validations'
import { DatabaseError } from '@/server/shared/Errors/DatabaseError'

type FindUser = { id: string; password: string } | null

/**
 * ユーザー検索
 *
 * @param email メールアドレス
 * @returns ユーザー情報 - メールアドレス
 */
async function findUser(email: string): Promise<FindUser> {
  try {
    // ユーザー情報取得
    const user = await prisma.user.findUnique({
      select: { id: true, password: true },
      where: { email },
    })

    return user as FindUser
  } catch (error) {
    // データベースエラー
    throw new DatabaseError()
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    /**
     * セッション
     *
     * @param token jwtトークン情報
     * @param session セッション情報
     * @returns
     */
    async session({ token, session }) {
      // セッションに情報をセット
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  providers: [
    Credentials({
      /**
       * 認証
       *
       * @param credentials 認証データ
       * @returns 認証エラーの場合はnullを返却
       */
      async authorize(credentials) {
        try {
          // バリデーション
          const parsedCredentials = await signinFormSchema.validate(credentials, {
            abortEarly: false,
          })

          // データベースアクセスしてユーザーパスワードの一致をチェック
          if (parsedCredentials) {
            // フォームデータのユーザー情報
            const { email, password } = parsedCredentials
            // ユーザー情報取得
            const user = await findUser(email)

            // ユーザー情報を取得できなかった場合は認証失敗
            if (!user) {
              return null
            }
            // パスワードが正しいかチェック
            const passwordMatch = await bcrypt.compare(password, user.password)
            // パスワード正しい場合はユーザー情報を返却
            if (passwordMatch) {
              return user
            }
          }

          // 認証失敗
          return null
        } catch (error: unknown) {
          // バリデーションエラー、データベースエラー
          if (error instanceof yup.ValidationError || error instanceof DatabaseError) {
            return null
          }

          // 認証失敗
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    // セッション有効期限を1時間に設定（秒単位）
    maxAge: 60 * 60,
    // 最終アクセスから15分経過後にセッションを更新
    updateAge: 15 * 60,
  },
})
