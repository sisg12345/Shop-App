import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

/**
 * バナー
 */
export default function Banner() {
  return (
    <section>
      <Flex $justifyContent="center" $backgroundColor="primary" $padding={2}>
        <Flex
          $justifyContent="space-between"
          $alignItems="center"
          $flexDirection={{ base: 'column', md: 'row' }}
          $width={{ base: '100%', md: '1040px' }}
        >
          <Box $width="100%">
            <Text as="h1" $variant="extraLarge" $marginTop={0} $color="white">
              ようこそ！
            </Text>
            <Text as="h1" $variant="extraLarge" $marginTop={0} $color="white">
              S.S SHOP
            </Text>
          </Box>
          <Box $width="100%">
            <Text as="p" $variant="mediumLarge" $color="white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officiis
              excepturi reprehenderit ea harum, laborum repellat accusamus alias eum impedit
              voluptatem aliquid eos minima qui voluptate deleniti adipisci doloremque nam.
            </Text>
            <Text as="p" $variant="mediumLarge" $color="white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptatum labore
              quo suscipit reiciendis consequuntur provident aut esse nemo. Sed dolores suscipit
              nesciunt minus eum. Accusamus ex officia impedit dolorum.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </section>
  )
}
