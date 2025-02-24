import type { ImageProps } from 'next/image'
import { useCallback, useMemo } from 'react'
import { styled } from 'styled-components'
import Dropzone from '../Dropzones/Dropzone'
import ImagePreview from './ImagePreview'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

// イメージプレビューのコンテナー
const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`

const InputImagesContainer = styled(Flex)``

// TODO
export type FileData = {
  id?: string
  src?: string
  file?: File
  selected?: boolean
  chosen?: boolean
}

interface InputImagesProps {
  /** 画像イメージ */
  name?: string
  /** 保持するファイル最大数 */
  images: FileData[]
  /** ドロップゾーンの横幅 */
  maximumNumber?: number
  /** ドロップゾーンの縦幅 */
  $width?: ImageProps['width']
  /** ドロップゾーンの縦幅 */
  $height?: ImageProps['height']
  /** バリデーションエラーフラグ */
  $hasError?: boolean
  /** 画像をドロップ / 削除ボタンクリック時のイベントハンドラー */
  onChange: (images: FileData[]) => void
}

/**
 * インプットイメージ
 */
export default function InputImages({
  name,
  images,
  maximumNumber,
  $width,
  $height = 200,

  $hasError,
  onChange,
}: InputImagesProps) {
  // ドロップゾーン表示 / 表表示: 保持するファイル最大数を超えた場合は非表示
  const isDropzoneDisplay = !maximumNumber || images.length < maximumNumber ? 'block' : 'none'

  /**
   * ファイル取得
   */
  const files = useMemo(
    () =>
      images?.filter((image: FileData) => image.file).map((image: FileData) => image.file as File),
    [images],
  )
  /**
   * 画像の削除イベントのハンドラー
   *
   * @param src イメージのURL
   */
  const handledRemove = useCallback(
    (src: ImageProps['src']) => {
      // 対象画像
      const image = images.find((image: FileData) => image.src === src)
      // 新しい画像一覧
      const newImages = images.filter((image) => image.src !== src)

      if (image) {
        if (image.file && image.src) {
          // オブジェクトからURLを解放、参照を取りやめる
          URL.revokeObjectURL(image.src)
          // 画像URL削除
          delete image.src
        }

        // 受け取ったチェンジイベントを実行
        onChange && onChange(newImages)
      }
    },
    [images, onChange],
  )
  /**
   * ファイルドロップのイベントハンドラー
   *
   * @param files ファイル
   */
  const handleDrop = useCallback(
    (files: File[]) => {
      // 画像一覧
      const newImages = []

      for (const file of files) {
        const image = images.find((image: FileData) => image.file == file)

        if (!image && (!maximumNumber || images.length + newImages.length < maximumNumber)) {
          newImages.push({ file, src: URL.createObjectURL(file) })
        }

        // 受け取ったチェンジイベントを実行
        onChange && onChange(newImages)
      }
    },
    [images, maximumNumber, onChange],
  )

  return (
    <InputImagesContainer $flexDirection="column">
      {/* ドロップゾーン表示 / 非表示BOX */}
      <Box style={{ display: isDropzoneDisplay }} $marginBottom="10px">
        <Dropzone
          name={name}
          value={files}
          acceptedFileTypes={['image/gif', 'image/jpeg', 'image/jpg', 'image/png']}
          $width={$width}
          $height={$height}
          $hasError={$hasError}
          onDrop={handleDrop}
        />
      </Box>
      <ImagePreviewContainer>
        {images &&
          images.map((image, index) => (
            <ImagePreview
              key={index}
              src={image.src as ImageProps['src']}
              alt="Preview Image"
              $width={$height}
              $height={$height}
              onRemove={handledRemove}
            />
          ))}
      </ImagePreviewContainer>
    </InputImagesContainer>
  )
}
