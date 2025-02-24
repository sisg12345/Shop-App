/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from '@/styles/themes'
import type { ResponsiveProp, Responsive } from '@/types/styles'

/**
 * Themeの型
 *
 * WARING: styled-componentsの型として使う場合は以下を注意
 * <ThemeProvider theme={theme}>より提供される引数を受け取るため、$をつける必要はなく、つけるとうまく動作しなくなる
 */
export type AppTheme = typeof theme

export type SpaceThemeKeys = keyof typeof theme.space
export type ColorThemeKeys = keyof typeof theme.colors
export type FontSizeThemeKeys = keyof typeof theme.fontSizes
export type LetterSpacingThemeKeys = keyof typeof theme.letterSpacings
export type LineHeightThemeKeys = keyof typeof theme.lineHeights

/**
 * 各Themeのキーの型
 *  (string & {})のUnion型にして任意の文字列を受けろることを許可 (ex) '10px')
 */
export type Color = ColorThemeKeys | (string & {})
export type FontSize = FontSizeThemeKeys | (string & {})
export type LetterSpacing = LetterSpacingThemeKeys | (string & {})
export type LineHeight = LineHeightThemeKeys | (string & {})
export type Space = SpaceThemeKeys | (string & {})

// ブレイクポイント
const BREAKPOINTS: { [key: string]: string } = {
  sm: '640px', // 640px以上
  md: '768px', // 768px以上
  lg: '1024px', // 1024px以上
  xl: '1280px', // 1280px以上
}

/**
 * CSSプロパティの文字列に変換
 *
 * @param propKey CSSプロパティ
 * @param prop CSSプロパティの設定値
 * @param theme <ThemeProvider theme={theme}>より提供されるthemeを受け取る
 * @returns CSSプロパティとその値 (ex) background-color: white;)
 */
export const toPropValue = <T>(
  propKey: string,
  prop?: Responsive<T>,
  theme?: AppTheme,
): string | undefined => {
  if (prop === undefined) {
    return undefined
  }

  // ResponsivePropの型であるかを判定
  // レスポンシブの指定がされているかどうか
  if (isResponsivePropType(prop)) {
    const result = []
    for (const responsiveKey in prop) {
      if (responsiveKey === 'base') {
        // デフォルトのスタイルをセット
        result.push(`${propKey}: ${toThemeValueIfNeeded(propKey, prop[responsiveKey], theme)};`)
      } else if (
        responsiveKey === 'sm' ||
        responsiveKey === 'md' ||
        responsiveKey === 'lg' ||
        responsiveKey === 'xl'
      ) {
        // メディアクエリのスタイルをセット
        const breakpoint = BREAKPOINTS[responsiveKey]
        const style = `${propKey}: ${toThemeValueIfNeeded(propKey, prop[responsiveKey], theme)};`

        result.push(`@media screen and (min-width: ${breakpoint}) {${style}}`)
      }
    }

    return result.join('\n')
  }

  return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`
}

/**
 * ResponsivePropの型であるかを判定
 *
 * @template T レスポンシブプロパティの値の型
 * @param prop チェックするプロパティ
 * @returns プロパティがレスポンシブプロパティの場合は `true` を返し、それ以外の場合は `false` を返す
 */
const isResponsivePropType = <T>(prop: any): prop is ResponsiveProp<T> => {
  return (
    (prop && prop.base !== undefined) ||
    prop.sm !== undefined ||
    prop.md !== undefined ||
    prop.lg !== undefined ||
    prop.xl !== undefined
  )
}

// Themeのspaceスタイルで指定できるCSSプロパティ
const SPACE_KEYS = new Set([
  'margin',
  'margin-top',
  'margin-left',
  'margin-bottom',
  'margin-right',
  'padding',
  'padding-top',
  'padding-left',
  'padding-bottom',
  'padding-right',
])
// Themeのcolorスタイルで指定できるCSSプロパティ
const COLOR_KEYS = new Set(['color', 'background-color'])
// Themeのborderスタイルで指定できるCSSプロパティ
const FONT_SIZE_KEYS = new Set(['font-size'])
// Themeのborderスタイルで指定できるCSSプロパティ
const LETTER_SPACING_KEYS = new Set(['letter-spacing'])
// Themeのborderスタイルで指定できるCSSプロパティ
const LINE_HEIGHT_KEYS = new Set(['line-height'])

/**
 * 必要に応じてThemeのスタイルに対応したCSSプロパティの文字列に変換
 *  提供された値がThemeのキーに対応するかどうかを確認し、対応するテーマ値が見つかった場合はその値を返す見つからない場合は、元の値を返す
 *
 * @template T 変換する値の型
 * @param propKey チェックするプロパティのキー
 * @param value 変換する値
 * @param theme テーマ値を含むテーマオブジェクト
 * @returns 対応するテーマ値が見つかった場合はその値、見つからない場合は元の値
 */
const toThemeValueIfNeeded = <T>(propKey: string, value: T, theme?: AppTheme) => {
  if (theme && theme.space && SPACE_KEYS.has(propKey) && isSpaceThemeKeys(value, theme)) {
    return theme.space[value]
  }
  if (theme && theme.colors && COLOR_KEYS.has(propKey) && isColorThemeKeys(value, theme)) {
    return theme.colors[value]
  }
  if (
    theme &&
    theme.fontSizes &&
    FONT_SIZE_KEYS.has(propKey) &&
    isFontSizeThemeKeys(value, theme)
  ) {
    return theme.fontSizes[value]
  }
  if (
    theme &&
    theme.letterSpacings &&
    LETTER_SPACING_KEYS.has(propKey) &&
    isLetterSpacingThemeKeys(value, theme)
  ) {
    return theme.letterSpacings[value]
  }
  if (
    theme &&
    theme.lineHeights &&
    LINE_HEIGHT_KEYS.has(propKey) &&
    isLineHeightThemeKeys(value, theme)
  ) {
    return theme.lineHeights[value]
  }

  return value
}

/**
 * Themeのspaceスタイルのキーであるかを判定
 *
 * @param value チェックするプロパティの値
 * @param theme Theme
 * @returns Themeのspaceスタイルのキーである場合はtrue、それ以外の場合はfalseを返す
 */
const isSpaceThemeKeys = (value: any, theme: AppTheme): value is SpaceThemeKeys => {
  return Object.keys(theme.space).filter((key) => key == value).length > 0
}

/**
 * Themeのcolorスタイルのキーであるかを判定
 *
 * @param value チェックするプロパティの値
 * @param theme Theme
 * @returns Themeのcolorスタイルのキーである場合はtrue、それ以外の場合はfalseを返す
 */
const isColorThemeKeys = (value: any, theme: AppTheme): value is ColorThemeKeys => {
  return Object.keys(theme.colors).filter((key) => key == value).length > 0
}

/**
 * Themeのfontsizeスタイルのキーであるかを判定
 *
 * @param value チェックするプロパティの値
 * @param theme Theme
 * @returns Themeのfontsizeスタイルのキーである場合はtrue、それ以外の場合はfalseを返す
 */
const isFontSizeThemeKeys = (value: any, theme: AppTheme): value is FontSizeThemeKeys => {
  return Object.keys(theme.fontSizes).filter((key) => key == value).length > 0
}

/**
 * ThemeのletterSpacingスタイルのキーであるかを判定
 *
 * @param value チェックするプロパティの値
 * @param theme Theme
 * @returns ThemeのletterSpacingスタイルのキーである場合はtrue、それ以外の場合はfalseを返す
 */
const isLetterSpacingThemeKeys = (value: any, theme: AppTheme): value is LetterSpacingThemeKeys => {
  return Object.keys(theme.letterSpacings).filter((key) => key == value).length > 0
}

/**
 * ThemeのlineHeightスタイルのキーであるかを判定
 *
 * @param value チェックするプロパティの値
 * @param theme Theme
 * @returns ThemeのlineHeightスタイルのキーである場合はtrue、それ以外の場合はfalseを返す
 */
const isLineHeightThemeKeys = (value: any, theme: AppTheme): value is LineHeightThemeKeys => {
  return Object.keys(theme.lineHeights).filter((key) => key == value).length > 0
}
