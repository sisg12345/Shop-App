'use server'

import type { Product, ProductCategory, ProductCondition, ResponseResult } from '@/types'
import type { FileData } from '@/components/molecules/Images/InputImages'
import { redirect } from 'next/navigation'
import { Create } from '@/server/application/product/create/create'
import { Command } from '@/server/application/product/create/command'
import { ProductService } from '@/server/domain/services/ProductService'
import { ProductRepository } from '@/server/infrastructure/repositories/product/ProductRepository'
import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/auth/routes'
import authGuard from '@/lib/auth/authGuard'

// 商品投稿フォームのデータ
export type ProductFormData = {
  /** 商品タイトル */
  title: Product['title']
  /** 商品値段 */
  price: Product['price']
  // /** 商品画像 */
  images: FileData[]
  // /** 商品カテゴリー */
  category: ProductCategory
  /** 商品の状態 */
  condition: ProductCondition
  /** 商品説明 */
  description: Product['description']
}

/**
 * 商品登録
 *
 * @param formData フォームデータ
 * @returns 処理失敗: エラー返却, 処理成功: ユーザー画面に遷移
 */
export async function registerProduct(formData: ProductFormData): Promise<ResponseResult> {
  // 認証ガード
  const session = await authGuard()

  // 認証ガード
  if (!session) {
    NextResponse.redirect(DEFAULT_LOGIN_REDIRECT, 401)
  }

  // ユースケースのインプットデータ
  const inputData = new Command(
    Number(session?.user?.id),
    formData.title,
    formData.price,
    formData.images,
    formData.category,
    formData.condition,
    formData.description,
  )

  // ユースケース実行
  const { success, message, errors }: ResponseResult = await new Create(
    inputData,
    new ProductService(),
    new ProductRepository(),
  ).handle()

  // エラーが存在する場合
  if (!success) {
    return {
      success: false,
      message,
      errors,
    }
  }

  // ユーザー画面に遷移
  redirect(`/users/${session?.user?.id}`)
}
