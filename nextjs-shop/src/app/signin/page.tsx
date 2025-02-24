import AppLogo from '@/components/atoms/Logos/AppLogo'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import { authenticate } from '@/app/api/signin/action'
import SigninForm from '@/components/organisms/Forms/SigninForm'

/**
 * サインインページ
 */
export default function SigninPage() {
  authenticate.bind(null, { redirectTo: '/cart' })

  return (
    <Flex
      $flexDirection="column"
      $justifyContent="center"
      $alignItems="center"
      $paddingTop={2}
      $paddingBottom={2}
      $width="400px"
    >
      <Box $marginBottom={2}>
        {/* アプリロゴ */}
        <AppLogo />
      </Box>
      <Box $width="100%">
        {/* サインインフォーム */}
        <SigninForm onSignin={authenticate} />
      </Box>
    </Flex>
  )
}
