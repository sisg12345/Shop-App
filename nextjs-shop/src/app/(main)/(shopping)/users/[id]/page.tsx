import { use } from 'react'
import BreadcrumbList from './BreadcrumbList'
import ProductList from './ProductList'
import UserInfo from './UserInfo'
import Separator from '@/components/atoms/Separators/Separator'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import { searchProducts } from '@/lib/services/products/search-products'
import type { Product, User } from '@/types'
import { fetcher } from '@/utils/fetch/fetcher'

type UserPageProps = {
  /** パラメーター */
  params: Promise<{ id: User['id'] }>
}

/**
 * 出品者情報取得
 */
const searchUser = async (userId: User['id']): Promise<User> => {
  return await fetcher(
    `${process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_PATH || 'http://localhost:3000'}/users/${userId}`,
  )
}

/**
 * 出品者ページ
 */
export default function UserPage({ params }: UserPageProps) {
  console.log('UserPage render...')

  // パラメーター
  const { id } = use(params)
  // 出品者情報取得
  const user = use(searchUser(id))
  // 商品一覧
  let products: Product[] = []

  // 出品者情報が存在すれば出品した商品一覧を取得
  if (user) {
    // 商品一覧を取得
    products = use(searchProducts<Product[] | []>({ userId: id }))
  }

  return (
    <Box>
      {/* パンくずリスト */}
      <BreadcrumbList userId={id} />
      <Flex
        as="main"
        $justifyContent="center"
        $paddingTop={2}
        $paddingBottom={2}
        $paddingLeft={{ base: 2, md: 0 }}
        $paddingRight={{ base: 2, md: 0 }}
      >
        <Box $marginTop={2}>
          <Box>
            {/* ユーザー情報 */}
            <UserInfo user={user} />
          </Box>
          <Box $marginBottom={1}>
            <Separator />
          </Box>
          <Box>
            {/* ユーザーの出品情報 */}
            <ProductList products={products} />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
