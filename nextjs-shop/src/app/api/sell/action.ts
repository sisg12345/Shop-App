'use server'

import type { Product, ProductCategory, ProductCondition, ResponseResult } from '@/types'
import type { FileData } from '@/components/molecules/Images/InputImages'
import { redirect } from 'next/navigation'
import { Command } from '@/server/application/product/create/command'
import { ProductService } from '@/server/domain/services/productService'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import authGuard from '@/lib/auth/authGuard'
import { CreateProductHandler } from '@/server/application/product/create/createProductHandler'

// 商品出品フォーム
export type ProductFormData = {
  /** 商品タイトル */
  title: string
  /** 商品値段 */
  price: Product['price']
  /** 商品画像 */
  images: FileData[]
  /** 商品カテゴリー */
  category: ProductCategory
  /** 商品の状態 */
  condition: ProductCondition
  /** 商品説明 */
  description: string
}

/**
 * 商品登録
 *
 * @param prevState 状態
 * @param formData フォームデータ
 * @returns 処理失敗: エラー返却, 処理成功: ユーザー画面に遷移
 */
export async function registerProduct(
  prevState: unknown,
  formData: ProductFormData,
): Promise<ResponseResult | void> {
  // 認証ガード
  const session = await authGuard()

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
  const { success, message, errors }: ResponseResult = await new CreateProductHandler(
    inputData,
    new ProductService(),
    new ProductRepository(),
  ).handle()

  // エラーが存在する場合
  if (!success) {
    return {
      success,
      message,
      errors,
    }
  }

  // ユーザー画面に遷移
  redirect(`/users/${session?.user?.id}`)
}
