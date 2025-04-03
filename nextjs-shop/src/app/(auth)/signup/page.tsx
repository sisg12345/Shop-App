import signup from '@/app/api/singup/action'
import AppLogo from '@/components/atoms/Logos/AppLogo'
import Box from '@/components/layouts/Box'
import SignupForm from '@/components/organisms/Forms/SignupForm'

/**
 * サインアップページ
 */
export default function SignupPage() {
  return (
    <>
      <Box $marginBottom={2}>
        {/* アプリロゴ */}
        <AppLogo />
      </Box>
      <Box $width="100%">
        {/* サインアップフォーム */}
        <SignupForm onSignup={signup} />
      </Box>
    </>
  )
}
