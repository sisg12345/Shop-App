import yup from '@/lib/yup'

// エラーメッセージオブジェクト
export type ErrorMessages = Record<string, { message: string }>

/**
 * エラーオブジェクトを作成
 *  yupのバリデーションエラーオブジェクトの形に合わせている
 *  例) { xxx: { message: 'エラーメッセー' } }
 *
 * @param error エラー
 */
export const generateErrors = (error: yup.ValidationError): ErrorMessages => {
  return error.inner.reduce((accumulator, currentError) => {
    accumulator[currentError.path!] = { message: currentError.message }
    return accumulator
  }, {} as ErrorMessages)
}
