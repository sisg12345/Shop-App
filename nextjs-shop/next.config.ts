import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: (() => {
    let compilerConfig: typeof nextConfig.compiler = {
      // styledComponentsの有効化
      styledComponents: true,
    }

    // 本番環境ではReact Testing Libraryで使用するdata-testid属性を削除
    if (process.env.NODE_ENV === 'production') {
      compilerConfig = {
        ...compilerConfig,
        reactRemoveProperties: { properties: ['^data-testid$'] },
      }
    }

    return compilerConfig
  })(),
  async rewrites() {
    // ダミーサーバーにリクエストを転用
    return [
      {
        // ex) /api/proxy
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:matches*`,
        // ex) http://localhost:8080
        destination: `${process.env.API_BASE_URL}/:matches*`,
      },
    ]
  },
  logging: {
    // キャッシュデータのデバッグ
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverActions: {
      // サーバーアクションで送信できるボディーサイズ、デフォルト: 1mb
      bodySizeLimit: '10mb',
    },
  },
}

export default nextConfig
