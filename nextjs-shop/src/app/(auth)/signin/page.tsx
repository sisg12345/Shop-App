import AppLogo from '@/components/atoms/Logos/AppLogo'
import Box from '@/components/layouts/Box'
import { signin } from '@/app/api/signin/action'
import SigninForm from '@/components/organisms/Forms/SigninForm'

/**
 * サインインページ
 */
export default function SigninPage() {
  return (
    <>
      <Box $marginBottom={2}>
        {/* アプリロゴ */}
        <AppLogo />
      </Box>
      <Box $width="100%">
        {/* サインインフォーム */}
        <SigninForm onSignin={signin} />
      </Box>
    </>
  )
}
