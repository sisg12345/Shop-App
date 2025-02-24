import type { ImageProps } from 'next/image'
import ShapeImage from '@/components/atoms/Images/ShapeImage'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

type UserProfileProps = {
  /** バリアント */
  $variant?: 'normal' | 'small'
  /** ユーザー名 */
  username: string
  /** ユーザー画像URL */
  profileImageUrl: ImageProps['src']
  /** ユーザーが所有する商品数 */
  numberOfProducts: number
  /** ユーザーの説明 */
  description?: string
}

/**
 * ユーザープロファイル
 */
export default function UserProfile({
  $variant = 'normal',
  username,
  profileImageUrl,
  numberOfProducts,
  description,
}: UserProfileProps) {
  // プロファイルサイズ
  const profileImageSize = $variant === 'small' ? 100 : 120

  return (
    <Flex>
      <Box>
        {/* ユーザー画像 */}
        <ShapeImage
          src={profileImageUrl}
          alt={username}
          quality="100"
          priority
          $width={profileImageSize}
          $height={profileImageSize}
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <Box $padding={1}>
        <Flex $flexDirection="column" $justifyContent="space-between" $height="100%">
          <Box>
            {/* ユーザー名 */}
            <Text as="p" $variant="mediumLarge" $fontWeight="bold" $marginTop={0} $marginBottom={1}>
              {username}
            </Text>
            {/* 商品出品数 */}
            <Text as="p" $marginTop={0} $marginBottom={1}>
              {numberOfProducts}点出品済
            </Text>
            <Text>
              {/* ユーザー説明 */}
              {$variant === 'normal' && (
                <Text as="p" $margin={0}>
                  {description}
                </Text>
              )}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}
