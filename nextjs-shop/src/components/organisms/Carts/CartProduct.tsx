import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/atoms/Buttons/Button'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

interface CartProductProps {
  /** 商品ID */
  id: number
  /** 商品タイトル */
  title: string
  /** 商品値段 */
  price: number
  /** 商品画像URL */
  imageUlr: string
  /** 購入ボタンクリックした時のイベントハンドラー */
  onBuyButtonClick?: (id: number) => void
  /** 削除ボタンをクリックした時のイベントハンドラー */
  onRemoveButtonClick?: (id: number) => void
}

/**
 * カート商品
 */
export default function CartProduct({
  id,
  title,
  price,
  imageUlr,
  onBuyButtonClick,
  onRemoveButtonClick,
}: CartProductProps) {
  return (
    <Flex $justifyContent="space-between">
      <Flex>
        <Box $width="120px" $height="120px">
          {/* 商品画像 */}
          <Link href={`/product/${id}`}>
            <Image
              src={imageUlr}
              alt={title}
              width={120}
              height={120}
              style={{ objectFit: 'cover' }}
            />
          </Link>
        </Box>
        <Box $padding={1} $height="100%">
          {/* 商品タイトル */}
          <Text as="p" $variant="mediumLarge" $fontWeight="bold" $marginTop={0} $marginBottom={1}>
            {title}
          </Text>
          {/* 商品値段 */}
          <Text as="p" $margin={0}>
            {price}円
          </Text>
          <Flex $margin={2}>
            {/* 購入ボタン */}
            <Button $width="100px" onClick={() => onBuyButtonClick && onBuyButtonClick(id)}>
              購入
            </Button>
            {/* 削除ボタン */}
            <Button
              $variant="danger"
              $marginLeft={1}
              $width="100px"
              onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
            >
              削除
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}
