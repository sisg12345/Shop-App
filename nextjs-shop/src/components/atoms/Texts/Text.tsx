'use client'

import styled from 'styled-components'
import type { Responsive } from '@/types/styles'
import type {
  LetterSpacingThemeKeys,
  LineHeightThemeKeys,
  AppTheme,
  Color,
  FontSize,
  LetterSpacing,
  LineHeight,
  Space,
} from '@/utils/style'
import { toPropValue } from '@/utils/style'

// TODO: stylesに移行？
// テキストのバリアント
type TextVariant = 'extraSmall' | 'small' | 'medium' | 'mediumLarge' | 'large' | 'extraLarge'

// テキストのバリアントごとの設定
const variants: Variants = {
  extraSmall: {
    fontSize: 'extraSmall',
    letterSpacing: 0,
    lineHeight: 0,
  },
  small: {
    fontSize: 'small',
    letterSpacing: 1,
    lineHeight: 1,
  },
  medium: {
    fontSize: 'medium',
    letterSpacing: 2,
    lineHeight: 2,
  },
  mediumLarge: {
    fontSize: 'mediumLarge',
    letterSpacing: 3,
    lineHeight: 3,
  },
  large: {
    fontSize: 'large',
    letterSpacing: 4,
    lineHeight: 4,
  },
  extraLarge: {
    fontSize: 'extraLarge',
    letterSpacing: 5,
    lineHeight: 5,
  },
} as const

/**
 * コンポーネント(<Text xxxx>Ex</Text)>に渡すprops例
 * ButtonVariant型
 *  $variant="primary"
 *
 * Responsive<FontSize>
 *  $fontSize="100px"
 *  $fontSize="large"
 *  $fontSize={{ base: 'small', sm: 'large' }}
 *  s$padding={{ base: '10px', sm: '100px' }}
 *
 * Responsive<LetterSpacing>型
 *  $letterSpacing="10px"
 *  $letterSpacing={1}
 *  $letterSpacing={{ base: 1, sm: 2 }}
 *  $letterSpacing={{ base: '10px', sm: '100px' }}
 *
 * Responsive<LineHeight>型
 *  $lineHeight={1}
 *  $lineHeight="10px"
 *  $lineHeight={{ base: 1, sm: 2 }}
 *  $lineHeight={{ base: '10px', sm: '100px' }}
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
type TextProps = {
  $variant?: TextVariant
  $fontSize?: Responsive<FontSize>
  $fontWeight?: Responsive<string>
  $letterSpacing?: Responsive<LetterSpacing>
  $lineHeight?: Responsive<LineHeight>
  $color?: Responsive<Color>
  $backgroundColor?: Responsive<Color>
  $width?: Responsive<string>
  $height?: Responsive<string>
  $minWidth?: Responsive<string>
  $minHeight?: Responsive<string>
  $display?: Responsive<string>
  $border?: Responsive<string>
  $overflow?: Responsive<string>
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

type Variants = Record<
  TextVariant,
  {
    fontSize: TextVariant
    letterSpacing: LetterSpacingThemeKeys
    lineHeight: LineHeightThemeKeys
  }
>

/**
 * テキスト
 */
const Text = styled.span<TextProps>`
  ${({ $variant = 'medium', $fontSize, $letterSpacing, $lineHeight, theme }) => {
    // バリアントのスタイルの適用
    if ($variant && variants[$variant]) {
      const styles = []

      !$fontSize && styles.push(toPropValue('font-size', variants[$variant].fontSize, theme))
      !$letterSpacing &&
        styles.push(toPropValue('letter-spacing', variants[$variant].letterSpacing, theme))
      !$lineHeight && styles.push(toPropValue('line-height', variants[$variant].lineHeight, theme))

      return styles.join('\n')
    }
  }}
  ${({ $fontSize, theme }) => toPropValue('font-size', $fontSize, theme)}
  ${({ $fontWeight, theme }) => toPropValue('font-weight', $fontWeight, theme)}
  ${({ $letterSpacing, theme }) => toPropValue('letter-spacing', $letterSpacing, theme)}
  ${({ $lineHeight, theme }) => toPropValue('line-height', $lineHeight, theme)}
  ${({ $color = 'text', theme }) => toPropValue('color', $color, theme)}
  ${({ $backgroundColor, theme }) => toPropValue('background-color', $backgroundColor, theme)}
  ${({ $width, theme }) => toPropValue('width', $width, theme)}
  ${({ $height, theme }) => toPropValue('height', $height, theme)}
  ${({ $minWidth, theme }) => toPropValue('min-width', $minWidth, theme)}
  ${({ $minHeight, theme }) => toPropValue('min-height', $minHeight, theme)}
  ${({ $display, theme }) => toPropValue('display', $display, theme)}
  ${({ $border, theme }) => toPropValue('border', $border, theme)}
  ${({ $overflow, theme }) => toPropValue('overflow', $overflow, theme)}
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

export default Text
