'use client'

import styled from 'styled-components'
import Box from './Box'
import type { BoxProps } from './Box'
import type {
  Responsive,
  CSSPropertyGridArea,
  CSSPropertyGridAutoFlow,
  CSSPropertyGridColumn,
  CSSPropertyGridRow,
} from '@/types/styles'
import { toPropValue } from '@/utils/style'
import type { AppTheme } from '@/utils/style'

/**
 * コンポーネント(<Grid>Ex</Gird)>に渡す$例
 *
 * $名="row"
 * $名={{ base: 'row', sm: 'column' }}
 *
 * Box$についてはBox$の定義ファイルのコメントを参考
 */
type GridProps = BoxProps & {
  $gridGap?: Responsive<string>
  $gridColumnGap?: Responsive<string>
  $gridRowGap?: Responsive<string>
  $gridColumn?: Responsive<CSSPropertyGridColumn>
  $gridRow?: Responsive<CSSPropertyGridRow>
  $gridAutoFlow?: Responsive<CSSPropertyGridAutoFlow>
  $gridAutoColumns?: Responsive<string>
  $gridAutoRows?: Responsive<string>
  $gridTemplateColumns?: Responsive<string>
  $gridTemplateRows?: Responsive<string>
  $gridTemplateAreas?: Responsive<CSSPropertyGridArea>
  $gridArea?: Responsive<string>
  theme?: AppTheme
}

/**
 * Gridコンポーネント
 * gridレイアウトの実現に利用する
 */
const Grid = styled(Box)<GridProps>`
  display: grid;
  ${({ $gridGap, theme }) => toPropValue('grid-gap', $gridGap, theme)}
  ${({ $gridColumnGap, theme }) => toPropValue('grid-column-gap', $gridColumnGap, theme)}
  ${({ $gridRowGap, theme }) => toPropValue('grid-row-gap', $gridRowGap, theme)}
  ${({ $gridRow, theme }) => toPropValue('grid-row', $gridRow, theme)}
  ${({ $gridColumn, theme }) => toPropValue('grid-column', $gridColumn, theme)}
  ${({ $gridAutoFlow, theme }) => toPropValue('grid-auto-flow', $gridAutoFlow, theme)}
  ${({ $gridAutoColumns, theme }) => toPropValue('grid-auto-columns', $gridAutoColumns, theme)}
  ${({ $gridAutoRows, theme }) => toPropValue('grid-auto-rows', $gridAutoRows, theme)}
  ${({ $gridTemplateColumns, theme }) =>
    toPropValue('grid-template-columns', $gridTemplateColumns, theme)}
  ${({ $gridTemplateRows, theme }) => toPropValue('grid-template-rows', $gridTemplateRows, theme)}
  ${({ $gridTemplateAreas, theme }) =>
    toPropValue('grid-template-areas', $gridTemplateAreas, theme)}
  ${({ $gridArea, theme }) => toPropValue('grid-area', $gridArea, theme)}
`

export default Grid
