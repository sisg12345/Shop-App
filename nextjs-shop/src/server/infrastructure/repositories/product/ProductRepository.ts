import 'server-only'

import prisma from '@/lib/prisma'
import { ProductDto } from '@/server/domain/dtos/ProductDto'
import { IProductRepository } from '@/server/domain/interfaces/repositories/IProductRepository'

/**
 * 商品レポジトリクラス
 */
export class ProductRepository implements IProductRepository {
  /**
   * 保存
   *
   * @param product 商品DTO
   */
  public async save(product: Required<ProductDto>): Promise<void> {
    await prisma.product.create({
      data: {
        category: product.category,
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        condition: product.condition,
        price: product.price,
        ownerId: 1,
        createUser: 1,
        updateUser: 1,
      },
    })
  }
}
