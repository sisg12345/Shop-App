import RectLoader from '@/components/atoms/Loadings/RectLoader'
import Box from '@/components/layouts/Box'

/**
 * 商品一覧のローティイグ中に表示するコンテンツ
 */
export default function ProductListLoading() {
  return (
    <>
      {Array.from(Array(16), (_, k) => (
        <Box key={k}>
          <Box $display={{ base: 'none', md: 'block' }}>
            <RectLoader $width={240} $height={240} />
          </Box>
          <Box $display={{ base: 'block', md: 'none' }}>
            <RectLoader $width={160} $height={160} />
          </Box>
        </Box>
      ))}
    </>
  )
}
