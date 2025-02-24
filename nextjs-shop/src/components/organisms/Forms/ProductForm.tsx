import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/atoms/Buttons/Button'
import Input from '@/components/atoms/Inputs/Input'
import TextArea from '@/components/atoms/Inputs/TextArea'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Dropdown from '@/components/molecules/Dropdowns/Dropdown'
import InputImages from '@/components/molecules/Images/InputImages'
import { PRODUCT_CATEGORY_NAME, PRODUCT_CONDITION } from '@/constants'
import type { ProductFormData } from '@/app/api/sell/action'
import { productFormSchema } from '@/lib/services/products/validations'
import type { ResponseResult } from '@/types'

interface ProductFormProps {
  /** サーバーアクション - 出品ボタンをクリックした時のイベントハンドラー */
  onProductSave: (data: ProductFormData) => Promise<ResponseResult>
}

/**
 * 商品投稿フォーム
 */
export default function ProductForm({ onProductSave }: ProductFormProps) {
  // formの初期化
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      title: '',
      price: undefined,
      images: [],
      category: undefined,
      condition: undefined,
      description: '',
    },
    // yupを使用するように設定
    resolver: yupResolver(productFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onProductSave)}>
      {/* 商品画像 */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="mediumLarge" $fontWeight="bold">
          商品の写真
        </Text>
        {/* 商品画像のアップロード */}
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputImages images={value} maximumNumber={1} onChange={onChange} $hasError={!!error} />
          )}
          {...register('images')}
        />
        <Text $variant="small" $color="danger">
          {errors.images?.message}
        </Text>
      </Box>
      {/* 商品情報 */}
      <Box $marginBottom={1}>
        <Box $marginBottom={2}>
          <Text as="label" $variant="mediumLarge" $fontWeight="bold">
            商品情報
          </Text>
        </Box>
        {/* 商品タイトル */}
        <Box $marginBottom={1}>
          <Text as="label" $variant="medium">
            タイトル
          </Text>
          {/* 商品タイトルの入力 */}
          <Input
            type="text"
            placeholder="商品のタイトル"
            $hasError={!!errors.title}
            {...register('title')}
          />
          <Box>
            <Text $variant="small" $color="danger">
              {errors.title?.message}
            </Text>
          </Box>
        </Box>
      </Box>
      {/* 商品概要 */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          概要
        </Text>
        {/* 商品概要の入力 */}
        <Controller
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <TextArea placeholder="商品の概要" $hasError={!!error} onChange={onChange}></TextArea>
          )}
          {...register('description')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.description?.message}
          </Text>
        </Box>
      </Box>
      {/* 商品カテゴリー */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          カテゴリー
        </Text>
        {/* 商品カテゴリーのドロップダウン */}
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Dropdown
              options={[
                { value: 'clothes', label: PRODUCT_CATEGORY_NAME.clothes },
                { value: 'book', label: PRODUCT_CATEGORY_NAME.book },
                { value: 'shoes', label: PRODUCT_CATEGORY_NAME.shoes },
              ]}
              value={value}
              placeholder="カテゴリーを選択してください"
              onChange={(item) => onChange(item?.value)}
              $hasError={!!error}
            />
          )}
          {...register('category')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.category?.message}
          </Text>
        </Box>
      </Box>
      {/* 商品状態 */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          商品の状態
        </Text>
        {/* 商品状態のドロップダウン */}
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Dropdown
              options={[
                { value: 'new', label: PRODUCT_CONDITION.new },
                { value: 'used', label: PRODUCT_CONDITION.used },
              ]}
              value={value}
              placeholder="カテゴリーを選択してください"
              onChange={(item) => onChange(item?.value)}
              $hasError={!!error}
            />
          )}
          {...register('condition')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.condition?.message}
          </Text>
        </Box>
      </Box>
      {/* 商品値段 */}
      <Box $marginBottom={1}>
        <Text as="label" $variant="medium">
          価格 (円)
        </Text>
        {/* 商品値段の入力 */}
        <Input type="text" placeholder="100" $hasError={!!errors.price} {...register('price')} />
        <Text $variant="small" $color="danger">
          {errors.price?.message}
        </Text>
      </Box>
      {/* 出品登録 */}
      <Button type="submit" $width="100%">
        出品
      </Button>
    </form>
  )
}
