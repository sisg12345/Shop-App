import styled, { css } from 'styled-components'
import type { AppTheme } from '@/utils/style'

type StyledSpinnerProps = NonNullable<{
  /** サイズ */
  $size: SpinnerProps['$size']
  /** 中央寄せフラグ */
  $isAutoCentering: SpinnerProps['$isAutoCentering']
}> & {
  /** テーマ */
  theme?: AppTheme
}

/**
 * スタイルされたスピナー
 */
const StyledSpinner = styled.svg<StyledSpinnerProps>`
  ${({ $size, $isAutoCentering }) =>
    $isAutoCentering
      ? css`
          margin: -${($size ?? 0) / 2}px 0 0 -${($size ?? 0) / 2}px;
        `
      : ''}
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  animation: rotate 2s linear infinite;
  &.path {
    stroke: #000000;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

type SpinnerProps = {
  $strokeWidth?: number
  $size?: number
  $isAutoCentering?: boolean
}

/**
 * スピナー
 */
export default function Spinner({
  $strokeWidth = 4,
  $size = 50,
  $isAutoCentering = false,
}: SpinnerProps) {
  return (
    <StyledSpinner
      className="path"
      $size={$size}
      $isAutoCentering={$isAutoCentering}
      viewBox={`0 0 ${$size} ${$size}`}
    >
      <circle
        cx={$size / 2}
        cy={$size / 2}
        r={$size / 2 - $strokeWidth / 2}
        fill="none"
        strokeWidth={$strokeWidth}
      />
    </StyledSpinner>
  )
}
