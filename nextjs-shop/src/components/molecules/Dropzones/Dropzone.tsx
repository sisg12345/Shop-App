'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import styled from 'styled-components'
import { CloudUploadIcon } from '@/components/atoms/Buttons/IconButton'
import type { AppTheme } from '@/utils/style'

/**
 * ドラッグイベントであるか判定
 *
 * @param value チェックするイベント
 * @returns ドラッグイベントである場合はtrue、ではなければfalse
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const isDragEvent = (value: any): value is DragEvent => {
  return !!value.dataTransfer
}

/**
 * input要素であるか判定
 *
 * @param value イベントオブジェクト.target
 * @returns input要素である場合はtrue, でなければfalse
 */
const isInputElement = (value: EventTarget | null): value is HTMLInputElement => {
  return value !== null
}

/**
 * イベントから入力されたファイルを取得
 *
 * @param e ドラッグ | チェンジイベント
 * @returns Fileの配列
 */
const getFilesFromEvent = (e: DragEvent | ChangeEvent): File[] => {
  if (isDragEvent(e)) {
    return Array.from(e.dataTransfer.files)
  }
  if (isInputElement(e.target) && e.target.files) {
    return Array.from(e.target.files)
  }

  return []
}

type DropzoneRootProps = NonNullable<{
  $width: DropzoneProps['$width']
  $height: DropzoneProps['$height']
}> & {
  $isFocused?: boolean
  $hasError?: DropzoneProps['$hasError']
  theme: AppTheme
}

/**
 * ドロップゾーンの外観
 */
const DropzoneRoot = styled.div<DropzoneRootProps>`
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width)};
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height)};
  border: 1px dashed
    ${({ $isFocused, $hasError, theme }) => {
      if ($hasError) {
        return theme.colors.danger
      }
      if ($isFocused) {
        return theme.colors.black
      }

      return theme.colors.border
    }};
  border-radius: 8px;
  cursor: pointer;
`

type DropZoneContentProps = NonNullable<{
  $height: DropzoneProps['$height']
}>

/**
 * ドロップゾーンの中身
 */
const DropzoneContent = styled.div<DropZoneContentProps>`
  width: 100%;
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

/**
 * ドロップゾーンのラベル
 */
const DropzoneLabel = styled.span`
  text-align: center;
`

/**
 * 非表示のダミーファイル入力input
 *  親コンポーネントから受け取ったイベント処理用
 */
const DisplayNoneInputFile = styled.input`
  display: none;
`

type FileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/gif'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/pdf'

interface DropzoneProps {
  /** <input />のname属性 */
  name?: string
  /** 入力ファイル */
  value?: File[]
  /** 許可するファイルタイプ */
  acceptedFileTypes?: FileType[]
  /** 横幅 */
  $width?: number | string
  /** 縦幅 */
  $height?: number | string
  /** バリデーションエラーフラグ */
  $hasError?: boolean
  /** チェンジイベントのハンドラー */
  onChange?: (files: File[]) => void
  /** ドロップイベントのハンドラー */
  onDrop?: (files: File[]) => void
}

/**
 * ドロップゾーン
 * ファイル入力を受け付ける
 */
export default function Dropzone({
  value = [],
  name,
  acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  $width,
  $height,
  $hasError,
  onChange,
  onDrop,
}: DropzoneProps) {
  // フォーカスの状態
  const [isFocused, setIsFocused] = useState(false)
  // inputの参照
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * ドラッグオーバーのイベントハンドラー
   *  ドラッグ状態のマウスポインタが範囲内入っている時
   *
   * @param e ドラッグイベント
   */
  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    // デフォルトの動作を無効
    e.preventDefault()
    // イベントの伝播を無効
    e.stopPropagation()
  }, [])
  /**
   * ドロップゾーンに入った時のイベントのハンドラー
   *  ドラッグ状態のマウスポインタが範囲内に来た時にフォーカスを当てる
   *
   * @param e ドラッグイベント
   */
  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    // デフォルトの動作を無効
    e.preventDefault()
    // イベントの伝播を無効
    e.stopPropagation()
    // フォーカスの状態をONにセット
    setIsFocused(true)
  }, [])
  /**
   * ドロップゾーンを離れた時のイベントのハンドラー
   *  ドラッグ状態のマウスポインタが範囲外に消えた時にフォーカスを外す
   *
   * @param e ドラッグイベント
   */
  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    // デフォルトの動作を無効
    e.preventDefault()
    // イベントの伝播を無効
    e.stopPropagation()
    // フォーカスの状態をOFFにセット
    setIsFocused(false)
  }, [])
  /**
   * ドロップイベントハンドラー
   *  ドラッグ状態のマウスポインタが範囲内でドロップされた時
   *
   * @param e ドラッグイベント
   */
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    // デフォルトの動作を無効
    e.preventDefault()
    // イベントの伝播を無効
    e.stopPropagation()
    // フォーカスの状態をOFFにセット
    setIsFocused(false)

    // ファイルを取得
    const files = value.concat(
      // イベントから入力されたファイルを取得
      getFilesFromEvent(e).filter((file) => acceptedFileTypes.includes(file.type as FileType)),
    )

    // TODO: エラーメッセージバー共通部品
    if (files.length === 0) {
      return window.alert(
        `次のファイルフォーマットは指定できません${acceptedFileTypes.join(' ,')})`,
      )
    }

    // 受け取ったドロップイベントを実行
    onDrop && onDrop(files)
    // 受け取ったチェンジイベントを実行
    onChange && onChange(files)
  }
  /**
   * クリックイベントのハンドラー
   *  ファイル選択ダイアログを表示
   */
  const handleClick = () => {
    // ファイル選択用の非表示ダミーファイル入力inputをクリック
    inputRef.current?.click()
  }
  /**
   * チェンジイベントのハンドラー
   *
   * @param e チェンジイベント
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // フォーカスの状態をOFFにセット
    setIsFocused(false)

    // ファイル取得
    const files = value.concat(
      // イベントから入力されたファイルを取得
      getFilesFromEvent(e).filter((file) => acceptedFileTypes.includes(file.type as FileType)),
    )

    // 受け取ったドロップイベントを実行
    onDrop && onDrop(files)
    // 受け取ったチェンジイベントを実行
    onChange && onChange(files)
  }

  useEffect(() => {
    // ファイル選択ダイアログ表示用の非表示ダミーファイル入力inputの値の初期化
    if (inputRef.current && value && value.length == 0) {
      inputRef.current.value = ''
    }
  }, [value])

  return (
    <>
      {/* ドラッグ & ドロップイベントを管理 */}
      <DropzoneRoot
        $width={$width}
        $height={$height}
        $isFocused={isFocused}
        $hasError={$hasError}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onClick={handleClick}
        data-testid="dropzone"
      >
        {/* ドロップゾーンクリック時にファイル選択ダイアログ表示用の非表示ダミーファイル入力input */}
        <DisplayNoneInputFile
          ref={inputRef}
          type="file"
          name={name}
          accept={acceptedFileTypes.join(',')}
          multiple
          onChange={handleChange}
        />
        <DropzoneContent $height={$height}>
          <CloudUploadIcon $size={24} />
          <DropzoneLabel>デバイスからアップロード</DropzoneLabel>
        </DropzoneContent>
      </DropzoneRoot>
    </>
  )
}
