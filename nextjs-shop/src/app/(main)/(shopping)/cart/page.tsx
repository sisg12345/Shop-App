'use client'

import CartInfo from './CartInfo'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import Breadcrumb from '@/components/molecules/Breadcrumbs/Breadcrumb'
import { PAGE_NAME } from '@/constants'
import useAuthGuard from '@/hooks/useAuthGuard'
import { fetcher } from '@/utils/fetch/fetcher'

/**
 * 商品購入
 *
 * @param productId 商品ID
 */
const onPurchaseProduct = async (params: { productId: number }): Promise<{ message: string }> => {
  return await fetcher(`${process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy'}/purchases`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * カートページ
 */
export default function CartPage() {
  return (
    <Box>
      {/* パンくずリスト */}
      <Breadcrumb
        breadcrumbsInfo={[
          { href: '/', label: PAGE_NAME.top },
          { href: '', label: 'カート' },
        ]}
      />
      <Flex
        as="main"
        $justifyContent="center"
        $flexDirection={{ base: 'column', md: 'row' }}
        $width="100%"
      >
        {/* カート情報 */}
        <CartInfo onPurchaseProduct={onPurchaseProduct} useAuthGuard={useAuthGuard} />
      </Flex>
    </Box>
  )
}
