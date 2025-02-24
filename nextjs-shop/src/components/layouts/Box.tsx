'use client'

import styled from 'styled-components'
import type { Responsive } from '@/types/styles'
import type { Color, AppTheme, Space } from '@/utils/style'
import { toPropValue } from '@/utils/style'

/**
 * コンポーネント(<Box>Ex</Box)>に渡すprops例
 *
 * Responsive<Color>型
 *  $color="#ffffff"
 *  $color="white"
 *  $color={{ base: '#ffffff', sm: '#000000' }}
 *  $color={{ base: 'white', sm: 'black' }}
 *
 * Responsive<Space>型
 *  $padding="100px"
 *  $padding={1}
 *  $padding={{ base: 1, sm: 2 }
 *  $padding={{ base: '10px', sm: '100ppx' }
 *
 * Responsive<string>型
 *  $width={'100px'}
 *  $width={{ base: '100px', sm: '200px' }}
 */

export type BoxProps = {
  $color?: Responsive<Color>
  $backgroundColor?: Responsive<Color>
  $width?: Responsive<string>
  $height?: Responsive<string>
  $minWidth?: Responsive<string>
  $minHeight?: Responsive<string>
  $display?: Responsive<string>
  $border?: Responsive<string>
  $overflow?: Responsive<string>
  $textAlign?: Responsive<string>
  $margin?: Responsive<Space>
  $marginTop?: Responsive<Space>
  $marginRight?: Responsive<Space>
  $marginBottom?: Responsive<Space>
  $marginLeft?: Responsive<Space>
  $padding?: Responsive<Space>
  $paddingTop?: Responsive<Space>
  $paddingRight?: Responsive<Space>
  $paddingBottom?: Responsive<Space>
  $paddingLeft?: Responsive<Space>
  theme?: AppTheme
}

/**
 * Boxコンポーネント
 * レイアウト調整用
 */
const Box = styled.div<BoxProps>`
  ${({ $color, theme }) => toPropValue('color', $color, theme)}
  ${({ $backgroundColor, theme }) => toPropValue('background-color', $backgroundColor, theme)}
  ${({ $width, theme }) => toPropValue('width', $width, theme)}
  ${({ $height, theme }) => toPropValue('height', $height, theme)}
  ${({ $minWidth, theme }) => toPropValue('min-width', $minWidth, theme)}
  ${({ $minHeight, theme }) => toPropValue('min-height', $minHeight, theme)}
  ${({ $display, theme }) => toPropValue('display', $display, theme)}
  ${({ $border, theme }) => toPropValue('border', $border, theme)}
  ${({ $overflow, theme }) => toPropValue('overflow', $overflow, theme)}
  ${({ $textAlign, theme }) => toPropValue('text-align', $textAlign, theme)}
  ${({ $margin, theme }) => toPropValue('margin', $margin, theme)}
  ${({ $marginTop, theme }) => toPropValue('margin-top', $marginTop, theme)}
  ${({ $marginBottom, theme }) => toPropValue('margin-bottom', $marginBottom, theme)}
  ${({ $marginRight, theme }) => toPropValue('margin-right', $marginRight, theme)}
  ${({ $marginLeft, theme }) => toPropValue('margin-left', $marginLeft, theme)}
  ${({ $padding, theme }) =>
    toPropValue('padding', $padding, theme)?.replaceAll(';', ' !important;')}
  ${({ $paddingTop, theme }) => toPropValue('padding-top', $paddingTop, theme)}
  ${({ $paddingBottom, theme }) => toPropValue('padding-bottom', $paddingBottom, theme)}
  ${({ $paddingLeft, theme }) => toPropValue('padding-left', $paddingLeft, theme)}
  ${({ $paddingRight, theme }) => toPropValue('padding-right', $paddingRight, theme)}
`

export default Box
