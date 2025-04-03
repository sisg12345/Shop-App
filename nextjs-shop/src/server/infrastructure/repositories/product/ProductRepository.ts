import 'server-only'

import prisma from '@/lib/prisma'
import { CreateProductDto } from '@/server/domain/dtos/createProductDto'
import { IProductRepository } from '@/server/domain/interfaces/repositories/IProductRepository'
import type { Product, ProductCategory } from '@/types'
import { ProductEntity } from '@/server/domain/entities/productEntity'

/**
 * 商品レポジトリクラス
 */
export class ProductRepository implements IProductRepository {
  /**
   *  商品を保存
   *
   * @param product 商品DTO
   */
  public async save(product: Required<CreateProductDto>): Promise<void> {
    // TODO: createUser
    await prisma.product.create({
      data: {
        category: product.category,
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        condition: product.condition,
        price: product.price,
        ownerId: product.ownerId,
        createUser: 0,
        updateUser: 0,
      },
    })
  }

  /**
   * カテゴリーから商品を取得
   *
   * @param category  カテゴリー
   * @param page  ページ
   * @param limit 件数
   * @param sort  ソート
   * @param order 順序
   */
  public async findByCategory(
    category: ProductCategory | null,
    page: number | null,
    limit: number | null,
    sort: string | null,
    order: string | null,
  ): Promise<ProductEntity[] | []> {
    const orderBy = sort ? { [sort]: order ?? 'asc' } : undefined

    return (await prisma.product.findMany({
      where: {
        category: category ?? undefined,
      },
      orderBy: orderBy,
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit ?? undefined,
    })) as ProductEntity[] | []
  }
}
