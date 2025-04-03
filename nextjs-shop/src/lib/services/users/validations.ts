import type { FileData } from '@/components/molecules/Images/InputImages'
import yup from '@/lib/yup'

/**
 * ユーザープロフィールフォームのバリデーションのスキーマ
 */
export const userProfileFormSchema = yup.object({
  email: yup.string().label('メールアドレス').email('正しい${label}を入力が必要です').required(),
  newPassword: yup
    .string()
    .label('パスワード')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value)) // undefined許容
    .min(6)
    .matches(/^[a-zA-Z0-9]+$/, '${label}は英数字のみ入力可能です'),
  newPasswordConfirm: yup
    .string()
    .label('確認パスワード')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value)) // undefined許容
    .min(6)
    .matches(/^[a-zA-Z0-9]+$/, '${label}は英数字のみ入力可能です')
    .test('passwords-match', '新パスワードと同じ文字の入力が必要です', function (value) {
      if (value === this.parent.newPassword) {
        return true
      }
      return false
    }),
  username: yup.string().label('ユーザー名').max(10),
  displayName: yup.string().label('ユーザー表皮名').max(10),
  images: yup
    .array<FileData>()
    .default([])
    .test('file-size', 'アップロード可能なサイズは5MB以下です', (images) =>
      images ? images.every(({ file }) => file.size <= 5 * 1024 * 1024) : true,
    ),
  description: yup.string().label('概要').max(100),
})
