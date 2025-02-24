import styled, { css } from 'styled-components'
import { commonStyle } from './style'
import type { AppTheme } from '@/utils/style'

type InputProps = {
  /** ボーダーライン表示フラグ */
  $hasBorder?: boolean
  /** バリデーションエラーフラグ */
  $hasError?: boolean
  /** テーマ */
  theme?: AppTheme
}

/**
 * テキストインプット
 */
const Input = styled.input<InputProps>`
  ${commonStyle}
  ${({ $hasError, $hasBorder = true, theme }) => {
    if ($hasBorder) {
      return css`
        border: 1px solid ${$hasError ? theme.colors.danger : theme.colors.border};
        border-radius: 5px;
      `
    }

    return css`
      border: none;
    `
  }}
  color: ${({ theme }) => theme.colors.text};
  height: 38px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
  }
`

export default Input
