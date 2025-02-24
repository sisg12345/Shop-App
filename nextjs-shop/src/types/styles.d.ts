/**
 * Responsiveプロパティ
 *  CSSプロパティの値をブレイクポイントごとに設定できる
 *  TはCSSプロパティの値のかた
 */
export type ResponsiveProp<T> = {
  /** デフォルト */
  base?: T
  /** 640px以上 */
  sm?: T
  /** 768px上 */
  md?: T
  /** 1024px以上 */
  lg?: T
  /** 1280px以上 */
  xl?: T
}

export type Responsive<T> = T | ResponsiveProp<T>

/**
 * Flex
 */
type SelfPosition =
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'self-end'
  | 'self-start'
  | 'start'

type ContentPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'start'

type ContentDistribution = 'space-around' | 'space-between' | 'space-evenly' | 'stretch'

type CSSPropertyGlobals = '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'unset'

export type CSSPropertyAlignItems =
  | CSSPropertyGlobals
  | SelfPosition
  | 'baseline'
  | 'normal'
  | 'stretch'
  | (string & {}) // コードの自動補完

export type CSSPropertyAlignContent =
  | CSSPropertyGlobals
  | ContentDistribution
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'start'
  | 'baseline'
  | 'normal'
  | (string & {}) // コードの自動補完

export type CSSPropertyJustifyItems =
  | CSSPropertyGlobals
  | SelfPosition
  | 'baseline'
  | 'left'
  | 'legacy'
  | 'normal'
  | 'right'
  | 'stretch'
  | (string & {}) // コードの自動補完

export type CSSPropertyJustifyContent =
  | CSSPropertyGlobals
  | ContentDistribution
  | ContentPosition
  | 'left'
  | 'normal'
  | 'right'
  | (string & {}) // コードの自動補完

export type CSSPropertyFlexWrap = CSSPropertyGlobals | 'nowrap' | 'wrap' | 'wrap-reverse'

export type CSSPropertyFlexDirection =
  | CSSPropertyGlobals
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'

export type CSSPropertyJustifySelf =
  | CSSPropertyGlobals
  | SelfPosition
  | 'auto'
  | 'baseline'
  | 'left'
  | 'normal'
  | 'right'
  | 'stretch'
  | (string & {}) // コードの自動補完

export type CSSPropertyAlignSelf =
  | CSSPropertyGlobals
  | SelfPosition
  | 'auto'
  | 'baseline'
  | 'normal'
  | 'stretch'
  | (string & {}) // コードの自動補完

/**
 * Grid
 */
type GridLine = 'auto' | (string & {}) // コードの自動補完

export type CSSPropertyGridColumn = CSSPropertyGlobals | GridLine | (string & {}) // コードの自動補完

export type CSSPropertyGridRow = CSSPropertyGlobals | GridLine | (string & {}) // コードの自動補完

export type CSSPropertyGridAutoFlow =
  | CSSPropertyGlobals
  | 'column'
  | 'dense'
  | 'row'
  | (string & {})

export type CSSPropertyGridArea = CSSPropertyGlobals | GridLine | (string & {}) // コードの自動補完
