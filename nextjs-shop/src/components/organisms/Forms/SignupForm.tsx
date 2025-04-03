'use client'

import { useForm } from 'react-hook-form'
import { SignupFormData } from '@/app/api/singup/action'
import Button from '@/components/atoms/Buttons/Button'
import Input from '@/components/atoms/Inputs/Input'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerActionsContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { signupFormSchema } from '@/lib/services/auth/validations'
import { startTransition, useActionState, useEffect } from 'react'
import type { ResponseResult } from '@/types'

interface SignupFormProps {
  // サインアップボタンクリックした時のイベントハンドラー
  onSignup: (prevState: unknown, formData: SignupFormData) => Promise<ResponseResult | void>
}

export default function SignupForm({ onSignup }: SignupFormProps) {
  // ローディングスピナーアクションコンテキストのフック
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // formの初期化
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    // yupを使用するように設定
    resolver: yupResolver(signupFormSchema),
  })
  // サーバーアクションの状態フック
  const [error, formAction, isPending] = useActionState(onSignup, undefined)

  /**
   * 送信のイベントハンドラー
   *
   * @param data フォームのデータ
   */
  const onSubmit = (data: SignupFormData) => {
    // 受けっとったサインインイベント(サーバーアクション)を実行
    startTransition(() => {
      formAction(data)
    })
  }

  useEffect(() => {
    // // ローディングスピナー表示 / 非表示
    setGlobalSpinner(isPending)

    return () => {
      // ローディングスピナー非表示
      setGlobalSpinner(false)
    }
  }, [isPending])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box $marginBottom={1}>
        {/* メールアドレスの入力 */}
        <Input
          type="text"
          placeholder="メールアドレス"
          $hasError={!!errors.email}
          {...register('email')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.email?.message}
          </Text>
        </Box>
      </Box>
      {/* ユーザーパスワードの入力 */}
      <Box $marginBottom={1}>
        <Input
          type="password"
          placeholder="パスワード"
          $hasError={!!errors.password}
          {...register('password')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.password?.message}
          </Text>
        </Box>
      </Box>
      {/* ユーザー確認パスワードの入力 */}
      <Box $marginBottom={1}>
        <Input
          type="password"
          placeholder="確認パスワード"
          $hasError={!!errors.passwordConfirm}
          {...register('passwordConfirm')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.passwordConfirm?.message}
          </Text>
        </Box>
      </Box>
      {/* エラー */}
      {!!error && (
        <Box $marginBottom={1}>
          <Text $variant="small" $color="danger">
            {error.message}
          </Text>
        </Box>
      )}
      {/* サインアップ */}
      <Button type="submit" $width="100%">
        サインアップ
      </Button>
    </form>
  )
}
