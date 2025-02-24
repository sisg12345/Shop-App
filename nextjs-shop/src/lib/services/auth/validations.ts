import yup from '@/lib/yup'

export const signinFormSchema = yup.object({
  email: yup.string().label('メールアドレス').email('正しい${label}を入力が必要です').required(),
  password: yup
    .string()
    .label('パスワード')
    .min(6, '${label}は${min}文字以上の入力が必要です')
    .required(),
})
