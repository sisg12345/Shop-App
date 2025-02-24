'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { SyntheticEvent, FormEvent } from 'react'
import styled from 'styled-components'
import Text from '@/components/atoms/Texts/Text'
import Flex from '@/components/layouts/Flex'
import type { AppTheme } from '@/utils/style'

// TODO: styled-componentsの要素div -> select, optionに修正

/**
 * ドロップダウンの外観
 */
const DropdownRoot = styled.div`
  position: relative;
  height: 38px;
`

type DropdownControlProps = {
  $hasError?: DropdownProps['$hasError']
  theme?: AppTheme
}

/**
 * ドロップダウン中身
 */
const DropdownControl = styled.div<DropdownControlProps>`
  border: ${({ $hasError, theme }) =>
    $hasError ? `1px solid ${theme.colors.danger}` : `1px solid ${theme.colors.border}`};
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: default;
  outline: none;
  padding: 8px 52px 8px 12px;
`

type DropdownMenuProps = {
  theme?: AppTheme
}

/**
 * ドロップダウンメニュー
 */
const DropdownMenu = styled.div<DropdownMenuProps>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: #ffffff;
  box-shadow:
    0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 10%),
    0px 3px 14px 2px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
`

/**
 * ドロップダウンのオプション
 */
const DropdownOption = styled.div`
  padding: 8px 12px 8px 12px;
  &:hover {
    background-color: #f9f9f9;
  }
`

type DropdownArrowProps = {
  $isOpen: boolean
}

/**
 * ドロップダウンの矢印
 */
const DropdownArrow = styled.div<DropdownArrowProps>`
  border-color: ${({ $isOpen }) =>
    $isOpen ? 'transparent transparent #222222;' : '#222222 transparent transparent'};
  border-width: ${({ $isOpen }) => ($isOpen ? '0 5px 5px' : '5px 5px 0;')};
  border-style: solid;
  content: ' ';
  display: block;
  height: 0;
  margin-top: -ceil(2.5);
  position: absolute;
  right: 10px;
  top: 16px;
  width: 0;
`

type DropdownValueProps = {
  theme?: AppTheme
}

/**
 * ドロップダウンの選択された値
 */
const DropdownValue = styled.div<DropdownValueProps>`
  color: ${({ theme }) => theme.colors.text};
`

type DropdownItem = {
  value: string | number | null
  label?: string
}

type DropdownItemProps = {
  item: DropdownItem
}

/**
 * ドロップダウンの表示項目
 */
function DropdownItem({ item }: DropdownItemProps) {
  return (
    <Flex $alignItems="center">
      <Text $variant="small" $margin={0}>
        {item.label ?? item.value}
      </Text>
    </Flex>
  )
}

type DropdownPlaceholderProps = {
  theme?: AppTheme
}

/**
 * ドロップダウンのプレースホルダー
 */
const DropdownPlaceholder = styled.div<DropdownPlaceholderProps>`
  color: #757575;
  font-size: ${({ theme }) => theme.fontSizes['small']};
  min-height: 20px;
  line-height: 20px;
`

interface DropdownProps {
  /** <input />のname属性 */
  name?: string
  /** ドロップダウンの値 */
  value?: string | number
  /** ドロップダウンの選択値 */
  options: DropdownItem[]
  /** プレースホルダー */
  placeholder?: string
  /** バリデーションエラーフラグ */
  $hasError?: boolean
  /** チェンジイベントのハンドラー */
  onChange?: (selected?: DropdownItem) => void
}

/**
 * ドロップダウン
 */
export default function Dropdown({
  name,
  value,
  options,
  placeholder,
  $hasError,
  onChange,
}: DropdownProps) {
  // 表示の状態
  const [isOpen, setIsOpen] = useState(false)
  // 初期値
  const initialItem = options.find((item) => item.value === value)
  // 選択された値の状態
  const [selectedItem, setSelectedItem] = useState(initialItem)
  // ドロップダウンの参照
  const dropdownRef = useRef<HTMLDivElement>(null)

  /**
   * ドロップダウンにマウスダウン/タッチダウンされた時の処理
   *
   * @param e マウスダウン / タッチダウンイベント
   */
  const handleMousedown = (e: SyntheticEvent) => {
    // 表示の状態更新
    setIsOpen((isOpen) => !isOpen)
    // イベントの伝播を無効
    e.stopPropagation()
  }
  /**
   * 値が選択された時の処理
   *
   * @param e フォームイベント
   * @param item 選択値
   */
  const handleSelectValue = (e: FormEvent<HTMLDivElement>, item: DropdownItem) => {
    // 選択値をセット
    setSelectedItem(item)
    // 表示の状態をOFFにセット
    setIsOpen(false)
    // イベントの伝播を無効
    e.stopPropagation()
    // 受け取ったチェンジイベントを実行
    onChange && onChange(item)
  }

  /**
   * ドロップダウンの画面外をクリック/タッチされた時の処理
   *  ドロップダウンメニューを閉じる
   *
   * @param e クリック/タッチイベント
   */
  const handleDocumentClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current) {
        const elements = dropdownRef.current.querySelectorAll('*')

        // 自分自身をクリックした場合は何もしない
        for (let i = 0; i < elements.length; i++) {
          if (elements[i] == e.target) {
            return
          }
        }

        // 表示の状態をOFFにセット
        setIsOpen(false)
      }
    },
    [dropdownRef],
  )

  useEffect(() => {
    // 画面外のクリック/タッチのイベント設定
    document.addEventListener('click', handleDocumentClick, false)
    document.addEventListener('touchend', handleDocumentClick, false)

    return () => {
      document.removeEventListener('click', handleDocumentClick, false)
      document.removeEventListener('touchend', handleDocumentClick, false)
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return (
    <DropdownRoot ref={dropdownRef}>
      <DropdownControl
        $hasError={$hasError}
        onMouseDown={handleMousedown}
        onTouchEnd={handleMousedown}
        data-testid="dropdown-control"
      >
        {/* 選択されたの値が存在する場合は選択済み値を表示 */}
        {selectedItem && (
          <DropdownValue>
            <DropdownItem item={selectedItem} />
          </DropdownValue>
        )}
        {/* 選択された値がない場合はプレースホルダーを表示 */}
        {!selectedItem && <DropdownPlaceholder>{placeholder}</DropdownPlaceholder>}
        <DropdownArrow $isOpen={isOpen} />
      </DropdownControl>
      {/* 非表示のダミーinput: 親コンポーネントから受け取ったイベント処理用 */}
      <input
        type="hidden"
        name={name}
        value={selectedItem?.value ?? ''}
        onChange={() => onChange && onChange(selectedItem)}
      />
      {/* ドロップダウンを表示 */}
      {isOpen && (
        <DropdownMenu>
          {options.map((item) => (
            <DropdownOption
              key={item.value}
              onMouseDown={(e) => handleSelectValue(e, item)}
              onClick={(e) => handleSelectValue(e, item)}
              data-testid="dropdown-option"
            >
              <DropdownItem item={item} />
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownRoot>
  )
}
