import 'server-only'

import { GetProductsHandler } from '@/server/application/product/get/category/getProductsHandler'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import type { ProductCategory, ResponseResult } from '@/types'
import { NextResponse } from 'next/server'
import { Command } from '@/server/application/product/get/category/command'

/**
 * カテゴリーの商品を取得
 *
 * @param request リクエスト
 * @param param パラメーター
 * @returns
 */
export async function GET(request: Request) {
  // クエリーを取得
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as ProductCategory
  const page = searchParams.get('_page')
  const limit = searchParams.get('_limit')
  const sort = searchParams.get('_sort')
  const order = searchParams.get('_order')

  // ユース〜ケースのインプットデータ
  const inputData = new Command(category, page, limit, sort, order)

  // ユースケース実行
  const result: ResponseResult = await new GetProductsHandler(
    inputData,
    new ProductRepository(),
  ).handle()

  // 結果返却
  return NextResponse.json(result)
}
