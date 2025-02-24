import yup from '@/lib/yup'
import type { FileData } from '@/components/molecules/Images/InputImages'
import type { ProductCategory, ProductCondition } from '@/types'

/**
 * 商品投稿フォームのバリデーションのスキーマ
 */
export const productFormSchema = yup.object({
  title: yup.string().label('タイトル').required(),
  price: yup
    .number()
    .label('価格')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value)) // undefined許容
    .typeError('${label}は整数のみ入力可能です')
    .positive('${label}は整数のみ入力可能です')
    .required(),
  images: yup
    .array<FileData>()
    .min(1, '写真のアップロードは必須です')
    .required()
    .test('file-size', 'アップロード可能なサイズは5MB以下です', (images) =>
      images.every(({ file }) => file.size <= 5 * 1024 * 1024),
    ),
  category: yup.string<ProductCategory>().label('カテゴリーの選択').required(),
  condition: yup.string<ProductCondition>().label('商品状態の選択').required(),
  description: yup.string().label('概要').required(),
})
