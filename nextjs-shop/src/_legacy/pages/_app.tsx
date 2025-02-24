import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

// グローバルのスタイル
// 簡易なリセットCSS
const GlobalStyle = createGlobalStyle`
html,
body,
input,
select,
button,
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
  cursor: pointer;
  text-decoration: none;
  transition: .25s;
  color: #000;
}

ol, ul {
  list-style: none;
}
`

/**
 *コンポーネントに対してグローバルスタイルを設定
 */
const WrapApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <GlobalStyle />
        <Component {...pageProps} />
      </Head>
    </>
  )
}

export default WrapApp
