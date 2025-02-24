'use client'

import Image from 'next/image'
import type { ImageProps } from 'next/image'
import styled from 'styled-components'
import type { Responsive } from '@/types/styles'
import { AppTheme, toPropValue } from '@/utils/style'

type ScaleEffectImageContainerProps = NonNullable<{
  $width: ScaleImageProps['$containerWidth']
  $height: ScaleImageProps['$containerHeight']
}> & {
  theme?: AppTheme
}

/**
 * エフェクトスケールのコンテナー
 */
const ScaleEffectImageContainer = styled.div<ScaleEffectImageContainerProps>`
  ${({ $width, theme }) => toPropValue('width', $width, theme)?.replaceAll(';', 'px;')}
  ${({ $height, theme }) => toPropValue('height', $height, theme)?.replaceAll(';', 'px;')}
  overflow: hidden;
`

/**
 * エフェクトスケール
 *  イメージにフェクトのスタイルを適応
 */
const ScaleEffectImage = styled(Image)`
  transition: transform 0.5s linear;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.1);
  }
`

/**
 * コンポーネント(<ScaleImage xxx />に渡すprops例)
 * Responsive<number>型
 *  <ScaleImage $containerWidth={100} containerHeight={100} />
 *  <ScaleImage $containerWidth={{ base: 100, sm: 200 }} $containerHeight={{ base: 100, sm: 200 }} />
 */
type ScaleImageProps = Omit<ImageProps, 'alt' | 'quality' | 'width' | 'height'> & {
  /** 代替テキスト */
  alt?: string
  /** スケールイメージのコンテナーの横幅 */
  $containerWidth?: Responsive<number>
  /** スケールイメージのコンテナーの縦幅 */
  $containerHeight?: Responsive<number>
  /** 横幅 */
  $width?: ImageProps['width']
  /** 縦幅 */
  $height?: ImageProps['height']
}

/**
 * スケールイメージ
 */
export default function ScaleImage({
  $containerWidth,
  $containerHeight,
  $width,
  $height,
  alt = '',
  ...rest
}: ScaleImageProps) {
  return (
    <ScaleEffectImageContainer
      $width={
        $containerWidth ??
        (($width ? $width : 320) as NonNullable<ScaleImageProps['$containerWidth']>)
      }
      $height={
        $containerHeight ??
        (($height ? $height : 320) as NonNullable<ScaleImageProps['$containerHeight']>)
      }
    >
      <ScaleEffectImage
        width={$width ?? 320}
        height={$height ?? 320}
        quality="100"
        alt={alt}
        priority
        {...rest}
      />
    </ScaleEffectImageContainer>
  )
}
