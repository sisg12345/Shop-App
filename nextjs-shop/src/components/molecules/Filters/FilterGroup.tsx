import { useCallback, useState } from 'react'
import type { ChangeEvent } from 'react'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import CheckBox from '@/components/molecules/CheckBoxes/CheckBox'

type Item = {
  label: string
  name: string
}

type FilterGroupProps = {
  /** タイトル */
  title: string
  /** 項目 */
  items: Item[]
  /** 値 */
  value?: string[]
  /** デフォルト値 */
  defaultValue?: string[]
  /** チェンジイベントのハンドラー */
  onChange?: (value: string[]) => void
}

/**
 * フィルターグループ
 */
export default function FilterGroup({
  title,
  items,
  value = [],
  defaultValue = [],
  onChange,
}: FilterGroupProps) {
  // 選択済みの値の状態
  const [selectedValues, setSelectedValues] = useState(value ?? defaultValue)

  /**
   * チェンジイベントのハンドラー
   *
   * @param e チェンジイベント
   */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // 選択された値
      const selected = e.target.name
      // 選択された値一覧
      const newSelectedValues = e.target.checked
        ? [...selectedValues, selected]
        : selectedValues.filter((value) => value !== selected)

      // 選択済みの値の状態更新
      setSelectedValues(newSelectedValues)
      // 受け取ったイベントを実行
      onChange && onChange(newSelectedValues)
    },
    [onChange, selectedValues],
  )

  return (
    <>
      <Text as="h2" $variant="mediumLarge" $fontWeight="bold" $paddingBottom={1}>
        {title}
      </Text>
      <Box>
        {items.map(({ label, name }, index) => (
          <Box key={index} $marginTop={index === 0 ? 0 : '4px'}>
            <CheckBox
              name={name}
              label={label}
              checked={!!selectedValues.find((value) => value === name)}
              onChange={handleChange}
            />
          </Box>
        ))}
      </Box>
    </>
  )
}
