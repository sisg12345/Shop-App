'use client'

import Link from 'next/link'
import styled from 'styled-components'
import BreadcrumbItem from '@/components/atoms/Breadcrumbs/BreadcrumbItem'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

/**
 * パンくずリストの外観
 */
const BreadcrumbRoot = styled(Flex)`
  list-style: none;
  padding: 0px;
  margin: 0px;
`

// パンくずリスト
export type Breadcrumb = {
  /** リンクの遷移先 */
  href: string
  /** パンくずリストの項目名  */
  label: string
}[]

type BreadcrumbProps = {
  // パンくずリストの情報
  breadcrumbsInfo: Breadcrumb
}

/**
 * パンくずリスト
 */
export default function Breadcrumb({ breadcrumbsInfo }: BreadcrumbProps) {
  return (
    <Box as="nav">
      <BreadcrumbRoot as="ul">
        {breadcrumbsInfo.map(({ href, label }, index) => (
          <BreadcrumbItem key={index}>
            <Link href={href}>{label}</Link>
          </BreadcrumbItem>
        ))}
      </BreadcrumbRoot>
    </Box>
  )
}
