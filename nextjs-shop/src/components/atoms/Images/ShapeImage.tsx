'use client'

import Image from 'next/image'
import type { ImageProps } from 'next/image'
import styled from 'styled-components'

type ShapeImageProps = Omit<ImageProps, 'width' | 'height'> & {
  /** 画像のバリアント */
  $variant?: 'circle' | 'square'
  /** 横幅 */
  $width?: ImageProps['width']
  /** 縦幅 */
  $height?: ImageProps['height']
}

const ImageWithShape = styled(Image)<ShapeImageProps>`
  border-radius: ${({ $variant }) => ($variant === 'circle' ? '50%' : '0')};
`

/**
 * シェイプイメージ
 */
export default function ShapeImage({ $variant, $width, $height, ...rest }: ShapeImageProps) {
  return <ImageWithShape $variant={$variant} width={$width} height={$height} {...rest} />
}
