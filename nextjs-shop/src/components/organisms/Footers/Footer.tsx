'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { GitHubIcon } from '@/components/atoms/Buttons/IconButton'
import Separator from '@/components/atoms/Separators/Separator'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

const StyledFooter = styled.footer`
  position: absolute;
  width: 100%;
`

/**
 * アンカー
 */
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

/**
 * フッター
 */
export default function Footer() {
  // TODO: 定数化
  // ナビゲーションのリンクのメニュー
  const navLinkMenu = [
    [
      { label: 'トップ', href: '/' },
      { label: '採用', href: '/' },
      { label: 'お知らせ', href: '/' },
    ],
    [
      { label: '利用規約', href: '/' },
      { label: 'プライバシーポリシー', href: '/' },
      { label: '配送と返品', href: '/' },
    ],
  ]

  return (
    <StyledFooter>
      <Separator />
      <Flex $flexDirection={{ base: 'column', md: 'row' }} $padding={2}>
        {navLinkMenu.map((menu, index) => (
          <Box $minWidth={{ base: '100%', md: '120px' }} $padding={{ base: 0, md: 1 }} key={index}>
            <nav>
              {menu.map(({ label, href }, index) => (
                <Box $marginBottom={2} key={index}>
                  <Link href={href}>{label}</Link>
                </Box>
              ))}
            </nav>
          </Box>
        ))}
        <Box $minWidth={{ base: '100%', md: '120px' }}>
          <nav>
            <Anchor as="a" href="/" target="_blank">
              <GitHubIcon $size={22} />
            </Anchor>
          </nav>
        </Box>
      </Flex>
      <Box $textAlign="center" $paddingTop={2} $paddingBottom={2}>
        <Text>© 2025 S.S. All rights reserved.</Text>
      </Box>
    </StyledFooter>
  )
}
