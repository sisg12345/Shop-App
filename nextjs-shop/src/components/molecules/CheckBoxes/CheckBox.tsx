import { useState, useRef, useEffect, useCallback } from 'react'
import type { InputHTMLAttributes, MouseEvent } from 'react'
import styled from 'styled-components'
import { CheckBoxIcon, CheckBoxOutlineBlankIcon } from '@/components/atoms/Buttons/IconButton'
import Text from '@/components/atoms/Texts/Text'
import Flex from '@/components/layouts/Flex'

// TODO:disabledの対応、disabled用のアイコンを作成

/**
 * 非表示のダミーチェックボックス
 *  親コンポーネントから受け取ったイベント処理用
 */
const DisplayNoneCheckBox = styled.input`
  display: none;
`

/**
 * ラベル
 */
const Label = styled.label`
  cursor: pointer;
  margin-left: 6px;
  user-select: none;
`

// defaultValueを使ってラベルを表示しないのでdefaultValueを除いた属性の型一覧を継承
interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  /** 表示ラベル */
  label?: string
}

/**
 * チェックボックス
 */
export default function CheckBox({ id, label, checked, onChange, ...rest }: CheckBoxProps) {
  // チェックの状態
  const [isChecked, setIsChecked] = useState(checked)
  // 非表示チェックボックスの参照
  const checkboxRef = useRef<HTMLInputElement>(null)

  // クリックイベント
  const handleClick = useCallback(
    (e: MouseEvent) => {
      // デフォルトの動作を無効
      e.preventDefault()
      // 非表示チェックボックスを強制的にクリック
      checkboxRef.current?.click()
      // チェック状態をセット
      setIsChecked((isChecked) => !isChecked)
    },
    [checkboxRef, setIsChecked],
  )

  useEffect(() => {
    // パラーメーターでチェックフラグが渡されていない場合のデフォルト値をセット
    setIsChecked(checked ?? false)
  }, [checked])

  return (
    <>
      {/* 親コンポーネントのイベント処理用非表示ダミーチェックボックス */}
      <DisplayNoneCheckBox
        ref={checkboxRef}
        type="checkbox"
        checked={checked}
        readOnly={!onChange}
        onChange={onChange}
        {...rest}
      />
      <Flex $alignItems={'center'}>
        {/* チェックボックスのON / OFFの状態を表すアイコンの切り替え */}
        {(checked ?? isChecked) ? (
          <CheckBoxIcon $size={20} onClick={handleClick} />
        ) : (
          <CheckBoxOutlineBlankIcon $size={20} onClick={handleClick} />
        )}
        {/* チェックボックスのラベル */}
        {label && label.length > 0 && (
          <Label htmlFor={id} onClick={handleClick}>
            <Text>{label}</Text>
          </Label>
        )}
      </Flex>
    </>
  )
}
