'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import Badge from '@/components/atoms/Badges/Badge'
import type { BadgeProps } from '@/components/atoms/Badges/Badge'

type BadgeIconButtonWrapperProps = {
  $size: NonNullable<BadgeIconButtonProps>['$size']
}

/**
 * バッジアイコン付きボタンのラッパー
 */
const BadgeIconButtonWrapper = styled.span<BadgeIconButtonWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`

type BadgeIconButtonProps = {
  /** アイコン */
  icon: ReactNode
  /** バッジのテキスト */
  badgeContent?: number
  /** サイズ */
  $size?: number
  /** バッジの背景カラー */
  $badgeBackgroundColor: BadgeProps['$backgroundColor']
}

/**
 * バッジのラッパー
 */
const BadgeWrapper = styled.div`
  position: absolute;
  top: -7px;
  right: -10px;
`

/**
 * バッジt付きアイコンボタン
 */
export default function BadgeIconButton({
  icon,
  badgeContent,
  $size = 24,
  $badgeBackgroundColor,
}: BadgeIconButtonProps) {
  return (
    <BadgeIconButtonWrapper $size={$size}>
      {icon}
      {badgeContent && (
        <BadgeWrapper data-testid="badge-wrapper">
          <Badge content={`${badgeContent}`} $backgroundColor={$badgeBackgroundColor} />
        </BadgeWrapper>
      )}
    </BadgeIconButtonWrapper>
  )
}
