import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // firebase-admin (and its transitive deps like google-gax/protobufjs) use
  // dynamic requires that Next's bundler can't trace correctly. Marking it
  // external tells Next to leave it as a plain node_modules require in the
  // serverless function instead of trying to bundle it — this is what was
  // causing "Failed to load external module firebase-admin" on Vercel.
  serverExternalPackages: ['firebase-admin'],

  // serverExternalPackages alone isn't always enough: Next's file tracer
  // can still miss the .proto/.json/.node files these packages load at
  // runtime, causing the same crash even though the package itself is
  // marked external. Force-including their folders fixes that.
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/firebase-admin/**',
      './node_modules/@grpc/**',
      './node_modules/google-gax/**',
      './node_modules/protobufjs/**',
      './node_modules/google-auth-library/**',
    ],
  },
}

export default nextConfig
