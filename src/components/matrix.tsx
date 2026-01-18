'use client'

type MatrixProps = {
  values: number[][]
  title?: string
}

export default function Matrix({ values, title }: MatrixProps) {
  if (!values || values.length === 0) {
    return null
  }

  const rows = values.length
  const cols = values[0]?.length ?? 0

  // Base dimensions
  const viewBoxWidth = cols * 80 + 80
  const viewBoxHeight = rows * 34 + 64
  const leftMargin = 18
  const rightMargin = 18
  const topMargin = 24
  const bottomMargin = 16
  const rowOffset = 6
  const rowSpacingAdd = 2

  // Calculate spacing
  const contentWidth = viewBoxWidth - leftMargin - rightMargin
  const contentHeight = viewBoxHeight - topMargin - bottomMargin
  const colSpacing = contentWidth / (cols + 0.5)
  const rowSpacing = contentHeight / (rows + 1) + rowSpacingAdd

  // Bracket dimensions
  const bracketY1 = topMargin
  const bracketY2 = viewBoxHeight - bottomMargin

  const ariaLabel = title || `Matrix ${rows} by ${cols}`

  return (
    <div className="writingArticle__codeCard writingArticle__codeCard--matrix">
      <div className="writingArticle__embedMatrix writingArticle__embedMatrix--full">
        <svg
          className="writingArticle__embedMatrixSvg"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          role="img"
          aria-label={ariaLabel}
        >
          {/* Title label */}
          {title && (
            <text
              x={viewBoxWidth / 2}
              y="15"
              className="matrixLabel"
              fill="#2ddf9b"
              textAnchor="middle"
            >
              {title}
            </text>
          )}
          {/* Left bracket */}
          <path
            className="embedMatrixBracket"
            d={`M${leftMargin} ${bracketY1} H${leftMargin - 10} V${bracketY2} H${leftMargin}`}
          />
          {/* Right bracket */}
          <path
            className="embedMatrixBracket"
            d={`M${viewBoxWidth - rightMargin} ${bracketY1} H${viewBoxWidth - rightMargin + 10} V${bracketY2} H${viewBoxWidth - rightMargin}`}
          />

          {/* Matrix values */}
          {values.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <text
                key={`${rowIndex}-${colIndex}`}
                x={rowOffset + leftMargin + colSpacing * (colIndex + 0.5)}
                y={topMargin + rowSpacing * (rowIndex + 1)}
                className="embedMatrixNumber"
              >
                {value}
              </text>
            )),
          )}
        </svg>
      </div>
    </div>
  )
}
