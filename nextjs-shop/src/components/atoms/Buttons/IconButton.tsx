'use client'

import {
  Search,
  PersonOutline,
  ShoppingCart,
  CheckBoxOutlineBlank,
  CheckBox,
  Cancel,
  CloudUpload,
  Close,
  GitHub,
  Person,
} from '@mui/icons-material'
import SvgIcon from '@mui/material/SvgIcon'
import type { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/themes'
import type { AppTheme } from '@/utils/style'

// カラーThemeのキー一覧の方
type ThemeColors = keyof typeof theme.colors
type IconWrapperProps = {
  $size: IconButtonProps['$size']
  $color?: IconButtonProps['$color']
  $backgroundColor?: IconButtonProps['$backgroundColor']
  $cursor?: string
  theme?: AppTheme
}

/**
 * アイコンのラッパー
 */
const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-block;
  font-size: ${({ $size }) => $size}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  /* colorが指定されてない場合はIconコンポーネント自身のデフォルトカラーを使用, nullを指定しているそのため */
  color: ${({ $color, theme }) => ($color ? theme.colors[$color] : null)};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  cursor: ${({ $cursor }) => $cursor ?? 'pointer'};
  svg {
    display: block;
  }
`

interface IconButtonProps {
  /** className属性 */
  className?: string
  /** サイズ */
  $size?: number
  /** カラー */
  $color?: ThemeColors
  /** 背景色 */
  $backgroundColor?: string
  /** クリックイベントハンドラー */
  onClick?: MouseEventHandler<SVGSVGElement>
}

/**
 * アイコンボタン
 */
const withIconStyle = (Icon: typeof SvgIcon) => {
  const IconButton = ({
    className,
    $size = 24,
    $color,
    $backgroundColor,
    onClick,
  }: IconButtonProps) => {
    const cursor = onClick ? 'pointer' : ''

    return (
      <IconWrapper
        $size={$size}
        $color={$color}
        $backgroundColor={$backgroundColor}
        $cursor={cursor}
      >
        <Icon className={className} fontSize="inherit" color="inherit" onClick={onClick} />
      </IconWrapper>
    )
  }

  return IconButton
}

// 閉じるアイコン
export const CloseIcon = withIconStyle(Close)
// 検索アイコン
export const SearchIcon = withIconStyle(Search)
// クラウドファイルアップロードアイコン
export const CloudUploadIcon = withIconStyle(CloudUpload)
// キャンセルアイコン
export const CancelIcon = withIconStyle(Cancel)
// チェックボックスアイコン
export const CheckBoxIcon = withIconStyle(CheckBox)
// チェックボックス空白アイコン
export const CheckBoxOutlineBlankIcon = withIconStyle(CheckBoxOutlineBlank)
// 人アイコン
export const PersonIcon = withIconStyle(Person)
// 人のアウトラインアイコン
export const PersonOutlineIcon = withIconStyle(PersonOutline)
// GitHubアイコン
export const GitHubIcon = withIconStyle(GitHub)
// ショッピングカートアイコン
export const ShoppingCartIcon = withIconStyle(ShoppingCart)
