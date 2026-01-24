'use client'

import type { ReactNode } from 'react'

export default function Note({ children }: { children: ReactNode }) {
  return <aside className="writingNote">{children}</aside>
}
