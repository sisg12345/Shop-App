'use client'

import styled from 'styled-components'
import { theme } from '@/styles/themes'
import type { ColorThemeKeys } from '@/utils/style'

type BadgeWrapperProps = {
  $backgroundColor: BadgeProps['$backgroundColor']
}

/**
 * バッジのラップー
 */
const BadgeWrapper = styled.div<BadgeWrapperProps>`
  background-color: ${({ $backgroundColor }) => {
    if ($backgroundColor in theme.colors) {
      return theme.colors[$backgroundColor as ColorThemeKeys]
    }

    return $backgroundColor
  }};
  border-radius: 20px;
  height: 20px;
  min-width: 20px;
  padding: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

/**
 * バッジ内のテキスト
 */
const BadgeText = styled.p`
  color: white;
  font-size: 11px;
  user-select: none;
`

export type BadgeProps = {
  /** バッジのテキスト */
  content: string
  /** 背景色 */
  $backgroundColor: ColorThemeKeys | string
}

/**
 * バッジ
 */
export default function Badge({ content, $backgroundColor }: BadgeProps) {
  return (
    <BadgeWrapper $backgroundColor={$backgroundColor}>
      <BadgeText>{content}</BadgeText>
    </BadgeWrapper>
  )
}
