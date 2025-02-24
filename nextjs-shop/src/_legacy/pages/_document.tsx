import Document from 'next/document'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

/**
 * SSRでstyled-componentsを使用できるようにするための設
 */
export default class WrapDocument extends Document {
  // サーバーサイドで初期プロパティを取得するためのメソッド
  static async getInitialProps(
    // ドキュメントコンテキスト
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    // styled-components のサーバーサイドスタイルシートを作成
    const sheet = new ServerStyleSheet()
    // 元のレンダリングページを保持
    const originalRenderPage = ctx.renderPage

    try {
      // renderPage メソッドをオーバーライドして、styled-components のスタイルを収集するように設定
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      // デフォルトの初期プロパティを取得
      const initialProps = await Document.getInitialProps(ctx)

      // 収集したスタイルを初期プロパティに追加
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      }
    } finally {
      // スタイルシートをクリーンアップ
      sheet.seal()
    }
  }
}
