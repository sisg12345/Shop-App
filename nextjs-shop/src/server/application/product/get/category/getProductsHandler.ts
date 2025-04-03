import 'server-only'

import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import type { ResponseResult } from '@/types'
import { ErrorMessages } from '@/utils/yupUtil'
import { Command } from './command'
import { MESSAGE } from '@/constants'
import { ProductEntity } from '@/server/domain/entities/productEntity'

export class GetProductsHandler {
  constructor(
    private readonly command: Command,
    private readonly productRepository: ProductRepository,
  ) {}

  public async handle(): Promise<ResponseResult<ProductEntity[] | []>> {
    // 処理結果
    let success = true
    // メッセージ
    let message
    // エラーメッセージオブジェクト
    let errors: ErrorMessages = {}
    // 取得データ
    let data

    try {
      data = await this.productRepository.findByCategory(
        this.command.category,
        this.command.page,
        this.command.limit,
        this.command.sort,
        this.command.order,
      )
    } catch (error: unknown) {
      // 処理失敗
      success = false
      // メッセージ
      message = MESSAGE.failure
    }

    return {
      success,
      message,
      errors,
      data,
    }
  }
}
