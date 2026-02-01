export function getBaseUrl() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_URL ||
    ''

  if (env) {
    const normalized = env.startsWith('http') ? env : `https://${env}`
    return normalized.replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}
