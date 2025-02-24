import UserProfile from '@/components/organisms/Profiles/UserProfile'
import type { User } from '@/types'

type UserInfoProps = {
  /** ユーザーの情報 */
  user: User
}

/**
 * ユーザー情報
 */
export default function UserInfo({ user }: UserInfoProps) {
  const { username, displayName, description, profileImageUrl } = user

  return (
    <UserProfile
      username={`${username} ${displayName}`}
      description={description}
      profileImageUrl={profileImageUrl}
      numberOfProducts={100}
    />
  )
}
