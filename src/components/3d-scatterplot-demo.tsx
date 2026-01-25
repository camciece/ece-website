/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'

interface Scatterplot3DDemoProps {
  points?: number[][][]
  labels?: string[]
}

export default function Scatterplot3DDemo({
  points = [],
  labels = [],
}: Scatterplot3DDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!containerRef.current || scriptLoadedRef.current)
      return // Store points data globally for the script to access
    ;(window as any).scatterplot3dPoints = points
    ;(window as any).scatterplot3dLabels = labels
    ;(window as any).scatterplot3dCurrentIndex = currentIndex

    // Create the SVG element that the script expects
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('id', 'scatterplot-3d-svg')
    svg.setAttribute('width', '720')
    svg.setAttribute('height', '480')
    svg.style.border = '1px solid #ddd'
    svg.style.borderRadius = '4px'
    containerRef.current.appendChild(svg)

    // Load the external script
    const script = document.createElement('script')
    script.type = 'module'
    script.src = '/3d-scatterplot.js'
    script.async = true

    script.onload = () => {
      scriptLoadedRef.current = true
    }

    script.onerror = () => {
      console.error('Failed to load 3d-scatterplot.js')
    }

    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      delete (window as any).scatterplot3dPoints
      delete (window as any).scatterplot3dLabels
      delete (window as any).scatterplot3dCurrentIndex
    }
  }, [points, labels])

  // Re-initialize when currentIndex changes
  useEffect(() => {
    if (!scriptLoadedRef.current) return
    ;(window as any).scatterplot3dCurrentIndex = currentIndex
    if ((window as any).scatterplot3dInit) {
      ;(window as any).scatterplot3dInit()
    }
  }, [currentIndex])

  const handleNext = () => {
    if (points.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % points.length)
    }
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <div
        ref={containerRef}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {points.length > 1 && (
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              padding: '8px 16px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              zIndex: 10,
            }}
          >
            Next ({currentIndex + 1}/{points.length})
          </button>
        )}
      </div>
    </div>
  )
}
