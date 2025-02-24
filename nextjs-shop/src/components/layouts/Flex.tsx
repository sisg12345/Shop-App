'use client'

import styled from 'styled-components'
import Box from './Box'
import type { BoxProps } from './Box'
import type {
  Responsive,
  CSSPropertyAlignItems,
  CSSPropertyAlignContent,
  CSSPropertyJustifyContent,
  CSSPropertyJustifyItems,
  CSSPropertyFlexWrap,
  CSSPropertyFlexDirection,
  CSSPropertyJustifySelf,
  CSSPropertyAlignSelf,
} from '@/types/styles'
import { toPropValue } from '@/utils/style'
import type { AppTheme } from '@/utils/style'

/**
 * コンポーネント(<Flex>Ex</Flex)>に渡すprops例
 *
 * props名="center"
 * props名={{ base: 'center', sm: 'start' }}
 *
 * BoxPropsについてはBoxPropsの定義ファイルのコメントを参考
 */
type FlexProps = BoxProps & {
  $alignItems?: Responsive<CSSPropertyAlignItems>
  $alignContent?: Responsive<CSSPropertyAlignContent>
  $justifyContent?: Responsive<CSSPropertyJustifyContent>
  $justifyItems?: Responsive<CSSPropertyJustifyItems>
  $flexWrap?: Responsive<CSSPropertyFlexWrap>
  $flexBasis?: Responsive<string>
  $flexDirection?: Responsive<CSSPropertyFlexDirection>
  $flexGrow?: Responsive<string>
  $flexShrink?: Responsive<string>
  $justifySelf?: Responsive<CSSPropertyJustifySelf>
  $alignSelf?: Responsive<CSSPropertyAlignSelf>
  $order?: Responsive<string>
  theme?: AppTheme
}

/**
 * Flexコンポーネント
 * flexboxの実現に利用する
 */
const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${({ $alignContent, theme }) => toPropValue('align-content', $alignContent, theme)}
  ${({ $alignItems, theme }) => toPropValue('align-items', $alignItems, theme)}
  ${({ $alignSelf, theme }) => toPropValue('align-self', $alignSelf, theme)}
  ${({ $justifyContent, theme }) => toPropValue('justify-content', $justifyContent, theme)}
  ${({ $justifyItems, theme }) => toPropValue('justify-items', $justifyItems, theme)}
  ${({ $justifySelf, theme }) => toPropValue('justify-self', $justifySelf, theme)}
  ${({ $flexBasis, theme }) => toPropValue('flex-basis', $flexBasis, theme)}
  ${({ $flexWrap, theme }) => toPropValue('flex-wrap', $flexWrap, theme)}
  ${({ $flexGrow, theme }) => toPropValue('flex-grow', $flexGrow, theme)}
  ${({ $flexShrink, theme }) => toPropValue('flex-shrink', $flexShrink, theme)}
  ${({ $flexDirection, theme }) => toPropValue('flex-direction', $flexDirection, theme)}
  ${({ $order, theme }) => toPropValue('order', $order, theme)}
`

export default Flex
