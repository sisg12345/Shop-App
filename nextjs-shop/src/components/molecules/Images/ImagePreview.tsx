'use client'

import Image from 'next/image'
import type { ImageProps } from 'next/image'
import type { MouseEvent } from 'react'
import styled from 'styled-components'
import { CloseIcon } from '@/components/atoms/Buttons/IconButton'
import type { BoxProps } from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

type ImagePreviewContainerProps = BoxProps & {
  $width: ImageProps['width']
  $height: ImageProps['height']
}

/**
 * イメージプレービューのコンテナー
 */
const ImagePreviewContainer = styled.div<ImagePreviewContainerProps>`
  width: ${({ $width }) => ($width ? `${$width}px` : '')};
  height: ${({ $height }) => ($height ? `${$height}px` : '')};
  position: relative;
`

/**
 * 閉じるボタンのボックス (Flexにも対応)
 */
const CloseBox = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 0 6px 0 6px;
  background-color: rgba(44, 44, 44, 0.66);
  cursor: pointer;
`

interface ImagePreviewProps extends Omit<ImageProps, 'width' | 'height'> {
  /** 横幅 */
  $width?: ImageProps['width']
  /** 縦幅 */
  $height?: ImageProps['height']
  /** 削除ボタンクリック時のイベントハンドラー */
  onRemove?: (src: ImageProps['src']) => void
}

/**
 * イメージプレビュー
 */
export default function ImagePreview({
  src,
  alt,
  $width,
  $height,
  onRemove,
  ...rest
}: ImagePreviewProps) {
  /**
   * 閉じるボタンのクリックイベントのハンドラー
   *
   * @param e クリックイベント
   */
  const handleCloseClick = (e: MouseEvent<HTMLDivElement>) => {
    // デフォルトの動作を無効
    e.preventDefault()
    // イベントの伝播を無効
    e.stopPropagation()
    // 受け取った閉じるボタンのイベントを実行
    onRemove && src && onRemove(src)

    return false
  }

  return (
    <ImagePreviewContainer $width={$width} $height={$height}>
      <Image src={src} alt={alt} width={$width} height={$height} {...rest} />
      <CloseBox $alignItems="center" $justifyContent="center" onClick={handleCloseClick}>
        <CloseIcon $size={24} $color="white" />
      </CloseBox>
    </ImagePreviewContainer>
  )
}
