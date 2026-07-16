// Next.js 16 uses proxy.ts — this file is kept for backwards compatibility
export { middleware } from './proxy'

// config must be defined directly here — Next.js cannot statically analyze re-exports
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
