'use client'

import styled from 'styled-components'
import type { Responsive } from '@/types/styles'
import type {
  AppTheme,
  Color,
  ColorThemeKeys,
  FontSize,
  LetterSpacing,
  LineHeight,
  Space,
} from '@/utils/style'
import { toPropValue } from '@/utils/style'

// TODO: stylesに移行？
// ボタンのバリアント
type ButtonVariant = 'primary' | 'secondary' | 'danger'

type Variants = Record<
  ButtonVariant,
  {
    color: ColorThemeKeys
    backgroundColor: ColorThemeKeys
    border: string
    pseudoClass: {
      hover: {
        backgroundColor: ColorThemeKeys
      }
      disabled: {
        backgroundColor: ColorThemeKeys
      }
    }
  }
>

// ボタンのバリアントごとの設定
const variants: Variants = {
  // プライマリー
  primary: {
    color: 'white',
    backgroundColor: 'primary',
    border: 'none',
    pseudoClass: {
      hover: {
        backgroundColor: 'primaryDark',
      },
      disabled: {
        backgroundColor: 'primary',
      },
    },
  },
  // セカンダリー
  secondary: {
    color: 'white',
    backgroundColor: 'secondary',
    border: 'none',
    pseudoClass: {
      hover: {
        backgroundColor: 'secondaryDark',
      },
      disabled: {
        backgroundColor: 'secondary',
      },
    },
  },
  // デンジャー
  danger: {
    color: 'white',
    backgroundColor: 'danger',
    border: 'none',
    pseudoClass: {
      hover: {
        backgroundColor: 'dangerDark',
      },
      disabled: {
        backgroundColor: 'danger',
      },
    },
  },
} as const

// TODO これいらなくね？
// ButtonHTMLAttributes<HTMLButtonElement> &

/**
 * コンポーネント(<Button xxxx>Ex</Button)>に渡すprops例
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
type ButtonProps = {
  $variant?: ButtonVariant
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
  $pseudoClass?: {
    hover?: {
      backgroundColor?: Responsive<Color>
    }
    disabled?: {
      backgroundColor?: Responsive<Color>
    }
  }
  theme?: AppTheme
}

/**
 * ボタン
 */
const Button = styled.button<ButtonProps>`
  ${({ $variant = 'primary', color = 'white', $backgroundColor, $pseudoClass, theme }) => {
    // バリアントのスタイルの適用
    if ($variant && variants[$variant]) {
      const styles = []

      color && styles.push(toPropValue('color', variants[$variant].color, theme))
      !$backgroundColor &&
        styles.push(toPropValue('background-color', variants[$variant].backgroundColor, theme))
      !$pseudoClass &&
        styles.push(
          `&:hover {
            ${toPropValue(
              'background-color',
              variants[$variant].pseudoClass.hover.backgroundColor,
              theme,
            )}
          }`.replaceAll('\n', ''),
        )
      !$pseudoClass &&
        styles.push(
          `&:disabled {
            ${toPropValue(
              'background-color',
              variants[$variant].pseudoClass.disabled.backgroundColor,
              theme,
            )}
          }`.replaceAll('\n', ''),
        )

      return styles.join('\n')
    }
  }}
  ${({ $fontSize = 'inherit', theme }) => toPropValue('font-size', $fontSize, theme)}
  ${({ $letterSpacing, theme }) => toPropValue('letter-spacing', $letterSpacing, theme)}
  ${({ $lineHeight = 'inherit', theme }) => toPropValue('line-height', $lineHeight, theme)}
  ${({ $color, theme }) => toPropValue('color', $color, theme)}
  ${({ $backgroundColor, theme }) => toPropValue('background-color', $backgroundColor, theme)}
  ${({ $width, theme }) => toPropValue('width', $width, theme)}
  ${({ $height, theme }) => toPropValue('height', $height, theme)}
  ${({ $minWidth, theme }) => toPropValue('min-width', $minWidth, theme)}
  ${({ $minHeight, theme }) => toPropValue('min-height', $minHeight, theme)}
  ${({ $display = 'inline-block', theme }) => toPropValue('display', $display, theme)}
  ${({ $border, theme }) => toPropValue('border', $border, theme)}
  ${({ $overflow, theme }) => toPropValue('overflow', $overflow, theme)}
  ${({ $textAlign = 'center', theme }) => toPropValue('text-align', $textAlign, theme)}
  ${({ $margin, theme }) => toPropValue('margin', $margin, theme)}
  ${({ $marginTop, theme }) => toPropValue('margin-top', $marginTop, theme)}
  ${({ $marginBottom, theme }) => toPropValue('margin-bottom', $marginBottom, theme)}
  ${({ $marginLeft, theme }) => toPropValue('margin-left', $marginLeft, theme)}
  ${({ $marginRight, theme }) => toPropValue('margin-right', $marginRight, theme)}
  ${({ $padding, theme }) =>
    toPropValue('padding', $padding, theme)?.replaceAll(';', ' !important;')}
  ${({ $paddingTop = 1, theme }) => toPropValue('padding-top', $paddingTop, theme)}
  ${({ $paddingBottom = 1, theme }) => toPropValue('padding-bottom', $paddingBottom, theme)}
  ${({ $paddingLeft = 2, theme }) => toPropValue('padding-left', $paddingLeft, theme)}
  ${({ $paddingRight = 2, theme }) => toPropValue('padding-right', $paddingRight, theme)}
  &:hover {
    ${({ $pseudoClass }) => toPropValue('background-color', $pseudoClass?.hover?.backgroundColor)}
  }
  &:disabled {
    ${({ $pseudoClass }) =>
      toPropValue('background-color', $pseudoClass?.disabled?.backgroundColor)}
  }
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  border-radius: 4px;
  border: none;
`

export default Button
