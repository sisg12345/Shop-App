import 'server-only'

import prisma from '@/lib/prisma'
import { UserEntity } from '@/server/domain/entities/userEntity'
import { IUserRepository } from '@/server/domain/interfaces/repositories/IUserRepository'
import type { User } from '@/types'
import { SaveUserDto } from '@/server/domain/dtos/saveUserDto'
import { UpdateUserDto } from '@/server/domain/dtos/updateUserDto'

export class UserRepository implements IUserRepository {
  /**
   *  ユーザーを保存
   *
   * @param dto ユーザー情報
   */
  public async save(dto: SaveUserDto): Promise<void> {
    // ユーザーを保存
    await prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        username: dto.username,
        displayName: dto.displayName,
        description: dto.description,
        profileImageUrl: dto.profileImageUrl,
        updateUser: 0,
        createUser: 0,
      },
    })

    // 作成ユーザーと更新ユーザーを更新
    await prisma.user.update({
      where: { id: dto.userId },
      data: {
        createUser: dto.userId,
        updateUser: dto.userId,
      },
    })
  }

  /**
   * ユーザー情報を更新
   *
   * @param dto ユーザー情報
   */
  public async update(dto: UpdateUserDto): Promise<void> {
    await prisma.user.update({
      where: { id: dto.userId },
      data: {
        email: dto.email,
        username: dto.username,
        displayName: dto.displayName,
        description: dto.description,
        profileImageUrl: dto.profileImageUrl,
        updateUser: dto.userId,
      },
    })
  }

  /**
   * パスワード更新
   *
   * @param userId ユーザーID
   * @param password パスワード
   */
  public async updatePassword(userId: User['id'], password: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        password,
        updateUser: userId,
      },
    })
  }

  /**
   * メールアドレスからユーザーを取得
   *
   * @param email メールアドレス
   */
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return new UserEntity(
      user.id,
      user.email,
      user.username,
      user.displayName,
      user.profileImageUrl,
      user.description,
      user.createUser,
      user.createDate,
      user.updateUser,
      user.updateData,
    )
  }

  /**
   * IDからユーザーを取得
   *
   * @param id  ユーザーID
   */
  public async findById(id: User['id']): Promise<UserEntity | null> {
    const user = (await prisma.user.findUnique({
      where: { id },
    })) as UserEntity | null

    if (!user) {
      return null
    }

    return user
  }
}
