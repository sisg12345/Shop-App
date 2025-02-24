import 'server-only'

import { ProductService } from '@/server/domain/services/ProductService'
import { Command } from './command'
import { FileUploadError } from '@/server/shared/Errors/FIleUpLoadError'
import { ResponseResult } from '@/types'
import { productFormSchema } from '@/lib/services/products/validations'
import { ErrorMessages, generateErrors } from '@/utils/yupUtil'
import yup from '@/lib/yup'
import { ProductDto } from '@/server/domain/dtos/ProductDto'
import { MESSAGE } from '@/constants'
import { ProductRepository } from '@/server/infrastructure/repositories/product/ProductRepository'

export class Create {
  constructor(
    private command: Command,
    private productService: ProductService,
    private productRepository: ProductRepository,
  ) {}

  public async handle(): Promise<ResponseResult> {
    let success = true
    // メッセージ
    let message
    // エラーメッセージオブジェクト
    let errors: ErrorMessages = {}

    try {
      // バリデーション実行
      this.validate(this.command)

      // 商品画像アップロードアップロード
      const imageUrl = await this.productService.fileUpload(this.command.images[0].file)
      // 商品DTO
      const productDto = new ProductDto(
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
      await this.productRepository.save(productDto as Required<ProductDto>)
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
