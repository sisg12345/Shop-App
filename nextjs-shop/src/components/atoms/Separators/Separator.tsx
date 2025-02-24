'use client'

import type { PropsWithChildren } from 'react'
import styled from 'styled-components'

/**
 * 子要素の有無に対応してマージンの値を取得
 *
 * @param 子要素
 * @returns マージンの値
 */
const getMargin = ({ children }: PropsWithChildren) => (children ? '.50em' : '0em')

/**
 * セパレーター
 */
const Separator = styled.div<PropsWithChildren>`
  height: 22px;
  color: #e5e7eb;
  display: flex;
  align-items: center;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
  }
  &::before {
    margin-right: ${getMargin};
  }
  &::after {
    margin-left: ${getMargin};
  }
`

export default Separator
