import AddCart from './AddCart'
import BreadcrumbList from './BreadcrumbList'
import ProductInfo from './ProductInrfo'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import type { Product } from '@/types'
import { buildRequestPath } from '@/utils/fetch/fetchUtil'
import { fetcher } from '@/utils/fetch/fetcher'

type ProductProps = {
  /** パラメーター */
  params: Promise<{ id: Product['id'] }> /** 商品ID */
}

/**
 *
 * @param id 商品ID
 * @returns 商品情報
 */
const searchProductById = async (id: number): Promise<Product> => {
  // 検索パラメーター
  const params = new URLSearchParams()
  params.append('id', id.toString())

  // リクエストパスを組み立てる
  const path = buildRequestPath(
    `${process.env.API_BASE_URL || 'http://localhost:3000'}/products`,
    params,
  )

  // 商品情報を取得
  return (await fetcher(path))[0]
}

/**
 * 商品ページ
 */
export default async function ProductPage({ params }: ProductProps) {
  console.log('ProductPage render...')

  // 商品ID
  const { id } = await params
  // 商品情報を取得
  const product = await searchProductById(id)

  return (
    <Box>
      {/* パンくずリスト */}
      <BreadcrumbList {...product} />
      <Flex
        as="main"
        $justifyContent="center"
        $flexDirection={{ base: 'column', md: 'row' }}
        $width="100%"
      >
        {/* 商品情報 */}
        <ProductInfo {...product}>
          {/* カートに商品を追加 */}
          <AddCart product={product} routeInfo={{ pathname: '/cart' }} />
        </ProductInfo>
      </Flex>
    </Box>
  )
}
