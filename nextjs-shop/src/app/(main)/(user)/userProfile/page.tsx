import { updateUserProfile } from '@/app/api/userProfile/action'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import UserProfileForm from '@/components/organisms/Forms/UserProfileForm'

/**
 * ユーザープロフィールページ
 */
export default function UserProfile() {
  return (
    <Flex
      $justifyContent="center"
      $paddingTop={{ base: 2, md: 4 }}
      $paddingBottom={{ base: 2, md: 4 }}
      $paddingLeft={{ base: 2, md: 0 }}
      $paddingRight={{ base: 2, md: 0 }}
    >
      <Flex $width="800px" $flexDirection="column" $justifyContent="center" $alignItems="center">
        <Box $width="100%">
          {/* ユー */}
          <UserProfileForm onSave={updateUserProfile} />
        </Box>
      </Flex>
    </Flex>
  )
}
