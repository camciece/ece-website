'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'reading-mode'

type ReadingMode = 'dark' | 'light'

function applyReadingMode(mode: ReadingMode) {
  const writingPage = document.querySelector('.writingPage')
  if (writingPage) {
    writingPage.setAttribute('data-reading-mode', mode)
  }
}

function applyGraphTheme(mode: ReadingMode) {
  const nextSrc = mode === 'dark' ? '/graph-dark.svg' : '/graph.svg'
  document.querySelectorAll<HTMLImageElement>('img[data-graph]').forEach((img) => {
    img.src = nextSrc
  })
}

export default function ReadingModeToggle() {
  const [mode, setMode] = useState<ReadingMode>('dark')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const initial: ReadingMode =
      stored === 'light' || stored === 'dark' ? stored : 'dark'
    setMode(initial)
    applyReadingMode(initial)
    applyGraphTheme(initial)
  }, [])

  const toggleMode = () => {
    const nextMode: ReadingMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    applyReadingMode(nextMode)
    applyGraphTheme(nextMode)
    localStorage.setItem(STORAGE_KEY, nextMode)
  }

  return (
    <button
      type="button"
      className="readingModeToggle"
      aria-pressed={mode === 'dark'}
      onClick={toggleMode}
    >
      Reading: {mode === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
