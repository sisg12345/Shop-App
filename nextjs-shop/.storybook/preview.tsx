import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from '../src/styles/themes/index'
import * as NextImage from 'next/image'
import { ComponentProps } from 'react'
import type { Preview } from '@storybook/react'

// 簡易のリセットCSS
export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    transition: .25s;
    color: #000;
  }
`

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // themeの適応
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <Story />
      </ThemeProvider>
    ),
  ],
}

// TODO: 最新バージョンで解決済み？だからいらない？かも
// // NOTE: storybookでnext/imageの画像最適化がうまく動作しないため、強制的に通常の画像と差し替え
// const OriginalNextImage = NextImage.default
// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: (props: ComponentProps<typeof OriginalNextImage>) =>
//     typeof props.src === 'string' ? (
//       <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
//     ) : (
//       <OriginalNextImage {...props} unoptimized />
//     ),
// })

export default preview
