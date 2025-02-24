import ScaleImage from '@/components/atoms/Images/ScaleImage'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'

/**
 * バリアントに応じた表示スタイルのサイズを取得
 *
 * @param variant バリアント
 * @returns 表示スタイルのサイズ
 */
const getSizeForVariant = (variant: Variant) => {
  switch (variant) {
    case 'listing':
      return { size: { base: 160, md: 240 }, imageSize: 240 }
    case 'detail':
      return { size: { base: 320, md: 540 }, imageSize: 540 }
    default:
      return { size: { base: 160 }, imageSize: 160 }
  }
}

type Variant = 'small' | 'listing' | 'detail'

type ProductCardProps = {
  /** 商品タイトル */
  title: string
  /** 商品値段 */
  price: number
  /** 商品画像URL */
  imageUrl: string
  /** 商品のぼかし画像のデータURIスキーム */
  blurDataUrl?: string
  /** 表示スタイルのバリアント */
  $variant: Variant
}

// TODO: カードボディー、ヘッダー、フッターなど

/**
 * 商品カード
 */
export default function ProductCard({
  title,
  price,
  imageUrl,
  blurDataUrl,
  $variant,
}: ProductCardProps) {
  // バリアントに応じた表示スタイルのサイズを取得
  const { size, imageSize } = getSizeForVariant($variant)

  return (
    <Box>
      {$variant !== 'small' && (
        <Box>
          <Text
            as="h2"
            $fontSize={{ base: 'small', md: 'mediumLarge' }}
            $letterSpacing={{ base: 2, md: 3 }}
            $lineHeight={{ base: '32px', md: '48px' }}
            $backgroundColor="white"
            $margin={0}
            $paddingRight={{ base: 1, md: 2 }}
            $paddingLeft={{ base: 1, md: 2 }}
            $paddingTop={0}
            $paddingBottom={0}
          >
            {title}
          </Text>
          <Text
            as="span"
            $fontWeight="bold"
            $display="inline-block"
            $backgroundColor="white"
            $fontSize={{ base: 'extraSmall', md: 'medium' }}
            $lineHeight={{ base: '8px', md: '12px' }}
            $letterSpacing={{ base: 2, md: 4 }}
            $margin={0}
            $padding={{ base: 1, md: 2 }}
          >
            {price}円
          </Text>
        </Box>
      )}
      {blurDataUrl && (
        <ScaleImage
          src={imageUrl}
          blurDataURL={blurDataUrl}
          placeholder="blur"
          style={{ objectFit: 'cover' }}
          $containerWidth={size}
          $containerHeight={size}
          $width={imageSize ?? 240}
          $height={imageSize ?? 240}
        />
      )}
      {!blurDataUrl && (
        <ScaleImage
          src={imageUrl}
          style={{ objectFit: 'cover' }}
          $containerWidth={size}
          $containerHeight={size}
          $width={imageSize ?? 240}
          $height={imageSize ?? 240}
        />
      )}
      {$variant === 'small' && (
        <Box $marginTop={1}>
          <Text as="h2" $variant="medium" $margin={0} $padding={0}>
            {title}
          </Text>
          <Text as="span" $variant="medium">
            {price}円
          </Text>
        </Box>
      )}
    </Box>
  )
}
