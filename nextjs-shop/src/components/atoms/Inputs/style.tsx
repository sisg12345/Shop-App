import { css } from 'styled-components'
import type { AppTheme } from '@/utils/style'

// 入力テキスト、テキストエリア共通スタイル
export const commonStyle = css<{ theme?: AppTheme }>`
  box-sizing: border-box;
  outline: none;
  padding: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`
