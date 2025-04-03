import 'server-only'

import { ProductService } from '@/server/domain/services/productService'
import { Command } from './command'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'
import type { ResponseResult } from '@/types'
import { productFormSchema } from '@/lib/services/products/validations'
import { generateErrors } from '@/utils/yupUtil'
import type { ErrorMessages } from '@/utils/yupUtil'
import yup from '@/lib/yup'
import { CreateProductDto } from '@/server/domain/dtos/createProductDto'
import { MESSAGE } from '@/constants'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'

export class CreateProductHandler {
  constructor(
    private readonly command: Command,
    private readonly productService: ProductService,
    private readonly productRepository: ProductRepository,
  ) {}

  public async handle(): Promise<ResponseResult> {
    // 処理結果
    let success = true
    // メッセージ
    let message
    // エラーメッセージオブジェクト
    let errors: ErrorMessages = {}

    try {
      // バリデーション実行
      this.validate(this.command)

      // 商品画像アップロード
      const imageUrl = await this.productService.fileUpload(this.command.images[0].file)
      // 商品DTO
      const createProductDto = new CreateProductDto(
        undefined, // 保存処理で自動裁判なので値はundefinedでOK
        this.command.category,
        this.command.description,
        this.command.title,
        imageUrl!,
        this.command.price,
        this.command.condition,
        this.command.userId,
      )

      // 保存
      await this.productRepository.save(createProductDto as Required<CreateProductDto>)
    } catch (error: unknown) {
      // 処理失敗
      success = false
      // メッセージ
      message = MESSAGE.failure

      // フォームバリデーション例外
      if (error instanceof yup.ValidationError) {
        // エラーオブジェクト生成
        errors = generateErrors(error)
      }
      // ファイルアップロード例外
      if (error instanceof FileUploadError) {
        message = error.message
      }
    }

    return {
      success,
      message,
      errors,
    }
  }

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  private async validate(command: Command) {
    // フォームデータのバリデーション
    await productFormSchema.validate(command, { abortEarly: false })
  }
}
