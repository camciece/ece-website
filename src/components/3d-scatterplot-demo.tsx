/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'

interface Scatterplot3DDemoProps {
  id?: string
  pointSets?: PointSet[]
  labels?: string[]
  width?: number
  height?: number
}

interface PointSet {
  points: number[][]
  name: string
}

export default function Scatterplot3DDemo({
  id = 'default-scatterplot',
  pointSets = [],
  labels = [],
  width,
  height = 360,
}: Scatterplot3DDemoProps) {
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const initializedRef = useRef(false)
  const [cssWidth, setCssWidth] = useState<number>(640)

  // Read width from CSS variable on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const computedWidth = getComputedStyle(document.documentElement)
        .getPropertyValue('--scatterplot-width')
        .trim()
      const numericWidth = parseInt(computedWidth, 10)
      if (!isNaN(numericWidth)) {
        setCssWidth(numericWidth)
      }
    }
  }, [])

  const finalWidth = width ?? cssWidth

  useEffect(() => {
    if (!svgContainerRef.current)
      return // Store points data globally for the script to access
    ;(window as any)[`${id}_points`] = pointSets.map((set) => set.points)
    ;(window as any)[`${id}_setNames`] = pointSets.map((set) => set.name)
    ;(window as any)[`${id}_labels`] = labels
    ;(window as any)[`${id}_currentIndex`] = currentIndex
    ;(window as any)[`${id}_width`] = finalWidth
    ;(window as any)[`${id}_height`] = height

    // Create the SVG element that the script expects
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const svgId = `${id}-scatterplot`
    svg.setAttribute('id', svgId)
    svg.setAttribute('width', String(finalWidth))
    svg.setAttribute('height', String(height))
    svg.style.border = '1px solid #ddd'
    svg.style.borderRadius = '4px'
    svgContainerRef.current.appendChild(svg)

    // Load the external script only once globally
    const existingScript = document.querySelector(
      'script[src="/3d-scatterplot.js"]',
    )

    if (!existingScript) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = '/3d-scatterplot.js'

      script.onload = () => {
        // Initialize this specific scatterplot
        if ((window as any).initScatterplot && !initializedRef.current) {
          ;(window as any).initScatterplot(svgId)
          initializedRef.current = true
        }
      }

      script.onerror = () => {
        console.error('Failed to load 3d-scatterplot.js')
      }

      document.body.appendChild(script)
    } else {
      // Script already exists, check if it's loaded
      const checkAndInit = () => {
        if ((window as any).initScatterplot) {
          if (!initializedRef.current) {
            ;(window as any).initScatterplot(svgId)
            initializedRef.current = true
          }
        } else {
          // Script still loading, wait a bit and try again
          setTimeout(checkAndInit, 50)
        }
      }
      checkAndInit()
    }

    return () => {
      // Cleanup
      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = ''
      }
      delete (window as any)[`${id}_points`]
      delete (window as any)[`${id}_setNames`]
      delete (window as any)[`${id}_labels`]
      delete (window as any)[`${id}_currentIndex`]
      delete (window as any)[`${id}_width`]
      delete (window as any)[`${id}_height`]
      delete (window as any)[`${id}_init`]
    }
  }, [id, pointSets, labels, finalWidth, height])

  // Re-initialize when currentIndex changes
  useEffect(() => {
    ;(window as any)[`${id}_currentIndex`] = currentIndex
    if ((window as any)[`${id}_init`]) {
      ;(window as any)[`${id}_init`]()
    }
  }, [id, currentIndex])

  // Re-render when reading mode changes
  useEffect(() => {
    const writingPage = document.querySelector('.writingPage')
    if (!writingPage) return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-reading-mode'
        ) {
          if ((window as any)[`${id}_init`]) {
            ;(window as any)[`${id}_init`]()
          }
        }
      })
    })

    observer.observe(writingPage, {
      attributes: true,
      attributeFilter: ['data-reading-mode'],
    })

    return () => {
      observer.disconnect()
    }
  }, [id])

  const handleNext = () => {
    if (pointSets.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % pointSets.length)
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div ref={svgContainerRef} />
      {pointSets.length > 1 && (
        <button onClick={handleNext} className="scatterplot3d__button">
          {pointSets[currentIndex].name}
        </button>
      )}
    </div>
  )
}
