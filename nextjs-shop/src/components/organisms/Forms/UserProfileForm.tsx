'use client'

import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerActionsContext'
import type { UserProfileFormData } from '@/app/api/userProfile/action'
import type { ResponseResult, User } from '@/types'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userProfileFormSchema } from '@/lib/services/users/validations'
import { startTransition, useActionState, useEffect } from 'react'
import Box from '@/components/layouts/Box'
import Text from '@/components/atoms/Texts/Text'
import Input from '@/components/atoms/Inputs/Input'
import TextArea from '@/components/atoms/Inputs/TextArea'
import Button from '@/components/atoms/Buttons/Button'
import InputImages, { FileData } from '@/components/molecules/Images/InputImages'
import { fetcher } from '@/utils/fetch/fetcher'
import { useSession } from 'next-auth/react'

interface UserProfileProps {
  /** サーバーアクション - 出品ボタンをクリックした時のイベントハンドラー */
  onSave: (prevState: unknown, data: UserProfileFormData) => Promise<ResponseResult | void>
}

/**
 * ユーザープロフィールフォーム
 */
export default function UserProfileForm({ onSave }: UserProfileProps) {
  // セッション
  const { data: session } = useSession()
  // ローディングスピナーアクションコンテキストのフック
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // formの初期化
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<UserProfileFormData>({
    defaultValues: {
      email: '',
      newPassword: '',
      newPasswordConfirm: '',
      username: '',
      displayName: '',
      images: [],
      description: '',
    },
    // yupを使用するように設定
    resolver: yupResolver(userProfileFormSchema),
  })
  // サーバーアクションの状態フック
  const [error, formAction, isPending] = useActionState(onSave, undefined)

  /**
   * 送信イベントのハンドラー
   *
   * @param data フォームのデータ
   */
  const onSubmit = async (data: UserProfileFormData) => {
    // 受けっとったサインインイベント(サーバーアクション)を実行
    startTransition(() => {
      formAction(data)
    })
  }

  // ユーザー情報を取得してフォームnの処理値をセット
  useEffect(() => {
    // ローディングスピナー表示 / 非表示
    setGlobalSpinner(isPending)

    /**
     * ユーザー情報を取得
     *
     * @returns ユーザープロフィール情報
     */
    const searchUserProfile = async (): Promise<User | undefined> => {
      const result = await fetcher<ResponseResult<User>>(`api/user/${session?.user?.id}`)

      return result.data
    }
    /**
     * ユーザープロフィールのデフォルト画像取得
     *  画像を取得してFileオブジェクトに変換
     *
     * @param imageUrl ユーザープロフィールのデフォルト画像URL
     */
    const fetchUserProfileDefaultImage = async (imageUrl: string) => {
      // URLより画像名を取得
      const fileName = imageUrl.split('/').at(-1)
      // 画像取得
      const response = await fetch(imageUrl)
      // Blobオブジェクトに変換
      const blob = await response.blob()
      // Blobのファイルオブジェクトを生成
      const file = new File([blob], fileName ?? '', { type: blob.type })
      // 画像データ生成
      const fileData: FileData = { file, src: URL.createObjectURL(file) }

      return fileData
    }

    // ローディングスピナー表示 / 非表示
    ;(async () => {
      setGlobalSpinner(true)

      // ユーザープロフィール情報を取得
      const user = await searchUserProfile()
      if (user) {
        setValue('email', user.email)
        setValue('username', user.username)
        setValue('displayName', user.displayName)
        setValue('description', user.description)

        // ユーザープロフィールのデフォルト画像取得
        const profileImage = await fetchUserProfileDefaultImage(user.profileImageUrl)
        setValue('images', [profileImage])
      }

      // ローディングスピナー非表示
      setGlobalSpinner(false)
    })()

    return () => {
      // ローディングスピナー非表示
      setGlobalSpinner(false)
    }
  }, [])

  // ユーザー情報を取得してフォームnの処理値をセット
  useEffect(() => {
    // ローディングスピナー表示 / 非表示
    setGlobalSpinner(isPending)

    return () => {
      // ローディングスピナー非表示
      setGlobalSpinner(false)
    }
  }, [isPending])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          ユーザープロフィール画像
        </Text>
        {/* ユーザープロフィール画像のアップロード */}
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputImages
              images={value ?? []}
              maximumNumber={1}
              onChange={onChange}
              $hasError={!!error}
            />
          )}
          {...register('images')}
        />
        <Text $variant="small" $color="danger">
          {errors.images?.message}
        </Text>
      </Box>
      {/* メールアドレス */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          メールアドレス
        </Text>
        {/* メールアドレスの入力 */}
        <Input type="text" $hasError={!!errors.email} readOnly {...register('email')} />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.email?.message}
          </Text>
        </Box>
      </Box>
      {/* ユーザー名 */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          ユーザー名
        </Text>
        {/* ユーザー名の入力 */}
        <Input type="text" $hasError={!!errors.username} {...register('username')} />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.username?.message}
          </Text>
        </Box>
      </Box>
      {/* ユーザー表示名 */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          ユーザー表示名
        </Text>
        {/* ユーザー表示名の入力 */}
        <Input type="text" $hasError={!!errors.displayName} {...register('displayName')} />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.displayName?.message}
          </Text>
        </Box>
      </Box>
      {/* ユーザー概要 */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          概要
        </Text>
        {/* ユーザー概要の入力 */}
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextArea $hasError={!!error} onChange={onChange} value={value}></TextArea>
          )}
        />
        {/* ユーザー新パスワード */}
        <Box>
          <Text $variant="small" $color="danger">
            {errors.description?.message}
          </Text>
        </Box>
      </Box>
      {/* ユーザー新パスワード */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          新パスワード
        </Text>
        {/* ユーザー新パスワードの入力 */}
        <Input type="password" $hasError={!!errors.newPassword} {...register('newPassword')} />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.newPassword?.message}
          </Text>
        </Box>
      </Box>
      {/* ユーザー新確認パスワード */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          新確認パスワード
        </Text>
        {/* ユーザー新確認パスワードの入力 */}
        <Input
          type="password"
          $hasError={!!errors.newPasswordConfirm}
          {...register('newPasswordConfirm')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.newPasswordConfirm?.message}
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
      {/* ユーザー情報更新 */}
      <Button type="submit" $width="100%">
        更新
      </Button>
    </form>
  )
}
