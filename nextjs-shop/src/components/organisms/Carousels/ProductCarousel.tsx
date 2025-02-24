'use client'

import { useEffect, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Flex from '@/components/layouts/Flex'
import { useWindowResize } from '@/hooks/useWindowResize'

/**
 * カルーセルのラッパー
 */
const CarouselWrapper = styled(Flex)`
  padding: 10px 0px;
`

/**
 * カルーセル矢印のラッパー
 */
const CarouseArrowWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 30px;
`

/**
 * カルーセル矢印ボタンの共通スタイル
 */
const CarouseButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: 50% 50%;
  width: 100%;
  height: 50%;
  cursor: pointer;
`

type CarouseButtonProps = {
  $show: boolean
  onClick: () => void
}

/**
 * カルーセル左矢印ボタン
 */
const CarouseLeftButton = styled(CarouseButton)<CarouseButtonProps>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  background-image: url('left-arrow.svg');
  border-radius: 8px 0 0 8px;
  box-shadow: -1px 0 2px rgba(0, 0, 0, 0.25);
`

/**
 * カルーセル右矢印ボタン
 */
const CarouseRightButton = styled(CarouseButton)<CarouseButtonProps>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  background-image: url('right-arrow.svg');
  border-radius: 0 8px 8px 0;
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.25);
`

/**
 * 商品カードのカルーセル
 */
export default function ProductCarousel({ children }: PropsWithChildren) {
  // カルーセルの参照
  const carouselWrapperRef = useRef<HTMLDivElement>(null)
  // カルーセル左矢印ボタン表示の状態
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false)
  // カルーセル左みぎ印ボタン表示の状態
  const [showRightButton, setShowRightButton] = useState<boolean>(false)
  // 画面の横幅サイズ変更検知
  const { windowWidth } = useWindowResize()

  /**
   * カルーセルの矢印ボタンをクリックした時のハンドラー
   *  スクロールバーを移動させる
   *
   * @param scrollLeft 左へスクロール
   * * @param scrollRight 右へスクロール
   */
  const handleClickScrollButton = ({
    scrollLeft = false,
    scrollRight = false,
  }: {
    scrollLeft?: boolean
    scrollRight?: boolean
  }) => {
    // カルーセル要素
    const carousel = carouselWrapperRef.current
    if (carousel) {
      // スクロール量
      let scroll

      // 左スクロール
      if (scrollLeft) {
        scroll = carousel.scrollLeft - 350
      } else if (scrollRight) {
        // 右スクロール
        scroll = carousel.scrollLeft + 350
      }

      // スクロールバーを右に移動
      carousel?.scroll({
        left: scroll,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    // カルーセル要素
    const carousel = carouselWrapperRef.current

    // スクロールバーが表示される場合
    if (carousel && carousel.scrollWidth > carousel.clientWidth) {
      // 矢印ボタンを表示
      carousel.scrollLeft > 0 && setShowLeftButton(true)
      setShowRightButton(true)
    } else {
      // 矢印ボタンを非表示
      setShowLeftButton(false)
      setShowRightButton(false)
    }

    /**
     * スクロールのイベントハンドラー
     *  スクロールバーが左もしく右端に達した時に時に応じて左右の矢印ボタンを表示非表示
     *
     * @param e イベント
     */
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      // スクロールバーが左端に達した時は左矢印ボタンを非表示
      target.scrollLeft === 0 ? setShowLeftButton(false) : setShowLeftButton(true)
      // スクロールバーが右端に達したは右矢印ボタンを非表示
      target.scrollWidth - target.scrollLeft - 1 > target.clientWidth
        ? setShowRightButton(true)
        : setShowRightButton(false)
    }

    // スクロールのイベントリスナーを登録
    carouselWrapperRef.current?.addEventListener('scroll', handleScroll, false)
  }, [windowWidth])

  return (
    <Flex>
      <CarouseArrowWrapper>
        <CarouseLeftButton
          $show={showLeftButton}
          onClick={() => handleClickScrollButton({ scrollLeft: true })}
        />
      </CarouseArrowWrapper>
      <CarouselWrapper ref={carouselWrapperRef} $overflow="scroll" $width="100%">
        {children}
      </CarouselWrapper>
      <CarouseArrowWrapper>
        <CarouseRightButton
          $show={showRightButton}
          onClick={() => handleClickScrollButton({ scrollRight: true })}
        />
      </CarouseArrowWrapper>
    </Flex>
  )
}
