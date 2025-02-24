'use client'

import { registerProduct } from '@/app/api/sell/action'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import ProductForm from '@/components/organisms/Forms/ProductForm'
import useAuthGuard from '@/hooks/useAuthGuard'

/**
 * 出品ページ
 */
export default function SellPage() {
  // 認証ガード
  const { session } = useAuthGuard()

  return (
    <Flex
      $justifyContent="center"
      $paddingTop={{ base: 2, md: 4 }}
      $paddingBottom={{ base: 2, md: 4 }}
      $paddingLeft={{ base: 2, md: 0 }}
      $paddingRight={{ base: 2, md: 0 }}
    >
      <Flex $width="800px" $flexDirection="column" $justifyContent="center" $alignItems="center">
        <Box $width="100%">
          {/* TODO: レイアウト */}
          {/* 認証されてない */}
          {!session && <Box $color="danger">出品するにはログインしてください</Box>}
          {/* 認証済み */}
          {session && <ProductForm onProductSave={registerProduct} />}
        </Box>
      </Flex>
    </Flex>
  )
}
