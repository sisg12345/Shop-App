import yup from '@/lib/yup'

/**
 * サインインフォームのバリデーションのスキーマ
 */
export const signinFormSchema = yup.object({
  email: yup.string().label('メールアドレス').email('正しい${label}を入力が必要です').required(),
  password: yup
    .string()
    .label('パスワード')
    .min(6)
    .matches(/^[a-zA-Z0-9]+$/, '${label}は英数字のみ入力可能です')
    .required(),
})

/**
 * サインアプうフォームのバリデーションのスキーマ
 */
export const signupFormSchema = yup.object({
  email: yup.string().label('メールアドレス').email('正しい${label}を入力が必要です').required(),
  password: yup
    .string()
    .label('パスワード')
    .min(6)
    .matches(/^[a-zA-Z0-9]+$/, '${label}は英数字のみ入力可能です')
    .required(),
  passwordConfirm: yup
    .string()
    .label('確認パスワード')
    .min(6)
    .matches(/^[a-zA-Z0-9]+$/, '${label}は英数字のみ入力可能です')
    .test('passwords-match', 'パスワードと同じ文字の入力が必要です', function (value) {
      if (value === this.parent.password) {
        return true
      }
      return false
    })
    .required(),
})
