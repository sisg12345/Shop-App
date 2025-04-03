import Link from 'next/link'
import { PropsWithChildren } from 'react'
import Separator from '@/components/atoms/Separators/Separator'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import ProductCard from '@/components/organisms/Cards/ProductCard'
import UserProfile from '@/components/organisms/Profiles/UserProfile'
import type { Product, User } from '@/types'

type ProductInfoProps = {
  /** タイトル */
  title: string
  /** 画像URL */
  imageUrl: string
  /** 値段 */
  price: Product['price']
  /** 商品説明 */
  description: string
  /** オーナー情報 */
  owner: {
    /** ユーザーID */
    id: User['id']
    /** ユーザー名 */
    username: string
    /** プロフィール画像のURL */
    profileImageUrl: string
  }
}

/**
 * 商品情報
 */
export default function ProductInfo({
  title,
  imageUrl,
  price,
  description,
  owner,
  children,
}: PropsWithChildren<ProductInfoProps>) {
  return (
    <>
      <Box>
        <Flex $justifyContent="center" $paddingTop={2} $paddingBottom={2}>
          <ProductCard title={title} price={price} imageUrl={imageUrl} $variant="detail" />
        </Flex>
        <Separator />
        <Box $paddingTop={1}>
          <Text as="h2" $variant="large" $marginTop={0} $paddingBottom={1}>
            出品者
          </Text>
          <Link href={`/users/${owner.id}`}>
            {/* ユーザープロファイル */}
            <UserProfile
              username={owner.username}
              profileImageUrl={owner.profileImageUrl}
              numberOfProducts={100}
              $variant="small"
            />
          </Link>
        </Box>
      </Box>
      <Box $padding={2} $width="100%">
        <Flex
          $flexDirection="column"
          $justifyContent="space-between"
          $height={{ base: '', md: '100%' }}
        >
          {/* 商品説明 */}
          <Box>
            {description.split('\n').map((text: string, i: number) => (
              <Text as="p" key={i}>
                {text}
              </Text>
            ))}
          </Box>
          {/* カートに商品を追加 */}
          {children}
        </Flex>
      </Box>
    </>
  )
}
