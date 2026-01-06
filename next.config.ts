import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables static export for serverless hosting
  output: 'export',

  // React 19 Compiler
  // @ts-expect-error: reactCompiler is not yet in the Next.js types
  reactCompiler: true,

  experimental: {
  },

  // These headers are MANDATORY for SQLite-WASM with OPFS support
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};

export default nextConfig;