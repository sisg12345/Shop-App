'use client'

import { useCallback, useState } from 'react'
import type { ChangeEvent, TextareaHTMLAttributes } from 'react'
import styled from 'styled-components'
import { commonStyle } from './style'
import type { AppTheme } from '@/utils/style'

type StyledTextAreaProps = {
  $hasError?: TextAreaProps['$hasError']
  theme?: AppTheme
}

/**
 * スタイルされたテキストエリア
 */
const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  ${commonStyle}
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: 5px;
  width: 100%;
  resize: none;
  overflow: auto;
  height: auto;
`

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 最小行数 */
  minRows?: number
  /** 最大行数 */
  maxRows?: number
  /** バリデーションエラーフラグ */
  $hasError?: boolean
}

/**
 * テキストエリア
 */
export default function TextArea({
  rows = 5, // デフォルト行数
  minRows = 5,
  maxRows = 10,
  $hasError,
  onChange,
  children,
  ...rest
}: TextAreaProps) {
  // 最小行数はデフォルト行数より大きい場合は例外をスロー
  if (minRows > rows) {
    throw new Error('TextArea: props value rows should be greater than minRows.')
  }

  // テキストエリアに設定する行数
  const [textareaRows, setTextareaRows] = useState(Math.min(rows, minRows))

  /**
   * チェンジイベントのハンドラー
   *  スクロール位置をテキストエリアの最下の位置することで点滅カーソルがボーダーラインと被らないようする
   *
   * @param e チェンジイベント
   */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      // 行ボックスの高さ
      const textareaLineHeight = 24
      // 変更前の行数
      const previousRows = e.target.rows

      // 行数をリセット
      e.target.rows = minRows

      // 現在行数
      const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight)
      if (currentRows === previousRows) {
        // 現在行数を設定
        e.target.rows = currentRows
      } else if (currentRows >= maxRows) {
        // 現在行数が最大行数を超えた場は、最大行数をセット
        e.target.rows = maxRows
        // スクロール位置をスクロールの高にセット
        e.target.scrollTop = e.target.scrollHeight
      }
      // 最大行数を超えないように行数をセット
      setTextareaRows(currentRows < maxRows ? currentRows : maxRows)

      // 受け取ったチェンジイベントを実行
      onChange && onChange(e)
    },
    [minRows, maxRows, onChange],
  )

  return (
    <StyledTextArea
      rows={textareaRows}
      $hasError={$hasError}
      aria-label={rest.placeholder}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </StyledTextArea>
  )
}
