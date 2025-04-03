'use client'

import Box from '@mui/material/Box/Box'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@/components/atoms/Buttons/Button'
import {
  LogoutIcon,
  PersonIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@/components/atoms/Buttons/IconButton'
import AppLogo from '@/components/atoms/Logos/AppLogo'
import Flex from '@/components/layouts/Flex'
import BadgeIconButton from '@/components/molecules/Buttons/BadgeIconButton'
import { PAGE_NAME, PRODUCT_CATEGORY_NAME } from '@/constants'
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext/ShoppingCartContext'
import type { AppTheme } from '@/utils/style'
import { useSession, signOut } from 'next-auth/react'
import { auth } from '@/lib/auth/auth'

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

  // ナビゲーションのリンクメニュー
  const categoryMenu = [
    { label: PRODUCT_CATEGORY_NAME.all, href: 'search' },
    {
      label: PRODUCT_CATEGORY_NAME.clothes,
      href: '/search/clothes',
    },
    {
      label: PRODUCT_CATEGORY_NAME.book,
      href: '/search/book',
    },
    {
      label: PRODUCT_CATEGORY_NAME.shoes,
      href: '/search/shoes',
    },
  ]
  // サインイン / サインアップのリンクメニュー
  const authMenu = [
    {
      label: PAGE_NAME.signin,
      href: '/signin',
    },
    {
      label: PAGE_NAME.signup,
      href: '/signup',
    },
  ]

  return (
    <HeaderRoot>
      <Flex $justifyContent="space-between" $paddingLeft={3} $paddingRight={3}>
        <Nav as="nav" $alignItems="center" $height="56px">
          <NavLink>
            <Link href="/">
              <AppLogo />
            </Link>
          </NavLink>
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
          {session && (
            <>
              {/* ユーザーアイコン */}
              <NavLink>
                <Link href="/userProfile">
                  <PersonIcon $size={24} />
                </Link>
              </NavLink>
              {/* サインアウトアイコン */}
              <NavLink>
                <LogoutIcon onClick={async () => await signOut({ callbackUrl: '/' })} />
              </NavLink>
            </>
          )}
          {/* メニュー - サインイン / サインアップ */}
          {!session &&
            authMenu.map(({ label, href }, index) => (
              <NavLink key={index}>
                <Link href={href}>{label}</Link>
              </NavLink>
            ))}
          {/* 出品ボタン */}
          <NavLink>
            <Link href="/sell">
              <Button>出品</Button>
            </Link>
          </NavLink>
        </Nav>
      </Flex>
      <Flex $justifyContent="space-between" $paddingLeft={3} $paddingRight={3}>
        {/* メニュー - カテゴリー */}
        <Nav as="nav" $alignItems="center" $height="24px">
          {categoryMenu.map(({ label, href }, index) => (
            <NavLink key={index}>
              <Link href={href}>{label}</Link>
            </NavLink>
          ))}
        </Nav>
      </Flex>
    </HeaderRoot>
  )
}
