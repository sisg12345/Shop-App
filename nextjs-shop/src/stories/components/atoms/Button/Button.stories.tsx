import { Meta, StoryObj } from '@storybook/react'
import Button from '@/components/atoms/Buttons/Button'

const meta = {
  title: 'Atoms/Button/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
      description: 'ボタンバリアント',
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    $width: {
      control: { type: 'text' },
      description: 'ボタンの横幅',
      table: {
        type: { summary: 'string' },
      },
    },
    $height: {
      control: { type: 'text' },
      description: 'ボタンの縦幅',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Button',
      description: 'ボタンテキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Disabledフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      description: 'onClickイベントハンドラー',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

// Primaryボタン
export const Primary: Story = {
  args: { $variant: 'primary', children: 'Primary Button' },
}

// Secondaryボタン
export const Secondary: Story = {
  args: { $variant: 'secondary', children: 'Secondary Button' },
}

// 無効化ボタン
export const Disabled: Story = {
  args: { disabled: true, children: 'Secondary Button' },
}
