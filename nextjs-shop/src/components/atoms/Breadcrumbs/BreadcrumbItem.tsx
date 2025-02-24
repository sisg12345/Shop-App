'use client'

import styled from 'styled-components'
import { AppTheme } from '@/utils/style'

type BreadcrumbItemProps = {
  /** テーマ */
  theme?: AppTheme
}

/**
 * パンくずリスト項目
 */
const BreadcrumbItem = styled.li<BreadcrumbItemProps>`
  list-style: none;
  display: inline;
  &:not(:first-child) {
    &::before {
      content: '/';
      color: ${({ theme }) => theme.colors.gray};
      padding: 0px 8px;
    }
  }
  a {
    color: ${({ theme }) => theme.colors.gray};
    &:hover {
      text-decoration: underline;
    }
  }
`

export default BreadcrumbItem
