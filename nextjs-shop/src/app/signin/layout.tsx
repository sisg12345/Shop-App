import { PropsWithChildren } from 'react'
import Flex from '@/components/layouts/Flex'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex
      $justifyContent="center"
      $paddingTop={2}
      $paddingBottom={2}
      $paddingLeft={2}
      $paddingRight={2}
    >
      {children}
    </Flex>
  )
}
