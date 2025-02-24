'use client'

import Box from '@mui/material/Box/Box'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@/components/atoms/Buttons/Button'
import { PersonIcon, SearchIcon, ShoppingCartIcon } from '@/components/atoms/Buttons/IconButton'
import ShapeImage from '@/components/atoms/Images/ShapeImage'
import AppLogo from '@/components/atoms/Logos/AppLogo'
import Flex from '@/components/layouts/Flex'
import BadgeIconButton from '@/components/molecules/Buttons/BadgeIconButton'
import { PRODUCT_CATEGORY_NAME } from '@/constants'
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext/ShoppingCartContext'
import type { AppTheme } from '@/utils/style'
import { useSession } from 'next-auth/react'

type HeaderRootProps = {
  theme?: AppTheme
}

/**
 * ヘッダーの外観
 */
const HeaderRoot = styled.header<HeaderRootProps>`
  padding: ${({ theme }) => theme.space[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

type NavProps = {
  theme?: AppTheme
}

/**
 * ナビゲーション
 */
const Nav = styled(Flex)<NavProps>`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.space[1]};
  }
`

/**
 * ナビゲーションのリンク
 */
const NavLink = styled.span`
  display: inline;
`

/**
 * ヘッダー
 */
export default function Header() {
  // ショッピングカートコンテキスト
  const { cart } = useShoppingCartContext()
  // セッション
  const { data: session } = useSession()

  // ナビゲーションのリンクのメニュー
  const navLinkMenu = [
    { label: PRODUCT_CATEGORY_NAME.all, href: 'search', display: { base: 'none', md: 'block' } },
    {
      label: PRODUCT_CATEGORY_NAME.clothes,
      href: 'search/clothes',
      display: { base: 'none', md: 'block' },
    },
    {
      label: PRODUCT_CATEGORY_NAME.book,
      href: 'search/book',
      display: { base: 'none', md: 'block' },
    },
    {
      label: PRODUCT_CATEGORY_NAME.shoes,
      href: 'search/shoes',
      display: { base: 'none', md: 'block' },
    },
  ]

  /**
   * ユーザーアイコンをレンダー
   */
  const renderUserIcon = () => {
    // 認証済みの場合はユーザーアイコンを表示
    // if (!session) {
    //   // TODO:
    //   return (
    //     <Link href={`users/$`}>
    //       <ShapeImage
    //         src={''}
    //         alt="User Icon"
    //         $variant="circle"
    //         $width={24}
    //         $height={24}
    //         data-testid="profile-shape-image"
    //       />
    //     </Link>
    //   )
    // }

    // 認証済みではない場合はアイコンを表示
    return (
      <Link href="/signin">
        <PersonIcon $size={24} />
      </Link>
    )
  }

  return (
    <HeaderRoot>
      <Flex $justifyContent="space-between" $paddingLeft={3} $paddingRight={3}>
        {/* メニュー */}
        <Nav as="nav" $alignItems="center" $height="56px">
          <NavLink>
            <Link href="/">
              <AppLogo />
            </Link>
          </NavLink>
          {navLinkMenu.map(({ label, href, display }, index) => (
            <NavLink key={index}>
              <Box display={display}>
                <Link href={`/${href}`}>{label}</Link>
              </Box>
            </NavLink>
          ))}
        </Nav>
        <Nav as="nav" $alignItems="center" $height="56px">
          {/* 検索アイコン */}
          <NavLink>
            <Link href="/search">
              <SearchIcon $size={24} />
            </Link>
          </NavLink>
          {/* カートアイコン */}
          <NavLink>
            <Link href="/cart">
              <BadgeIconButton
                icon={<ShoppingCartIcon $size={24} />}
                $size={24}
                $badgeBackgroundColor="primary"
                badgeContent={cart.length === 0 ? undefined : cart.length}
              />
            </Link>
          </NavLink>
          <NavLink></NavLink>
          {/* ユーザーアイコン */}
          <NavLink>{renderUserIcon()}</NavLink>
          {/* 出品ボタン */}
          <NavLink>
            <Link href="/sell">
              <Button>出品</Button>
            </Link>
          </NavLink>
        </Nav>
      </Flex>
    </HeaderRoot>
  )
}
