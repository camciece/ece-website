'use client'

type MatrixProps = {
  values: number[][]
  title?: string
  prefix?: string
  suffix?: string
}

export default function Matrix({ values, title, prefix, suffix }: MatrixProps) {
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

  // Add extra space for prefix/suffix labels
  const prefixSpace = prefix ? prefix.length * 10 : 0
  const suffixSpace = suffix ? suffix.length * 10 : 0
  const totalViewBoxWidth = viewBoxWidth + prefixSpace + suffixSpace

  // Calculate spacing
  const contentWidth = viewBoxWidth - leftMargin - rightMargin
  const contentHeight = viewBoxHeight - topMargin - bottomMargin
  const colSpacing = contentWidth / (cols + 0.5)
  const rowSpacing = contentHeight / (rows + 1) + rowSpacingAdd

  // Bracket dimensions (offset by prefixSpace)
  const bracketY1 = topMargin
  const bracketY2 = viewBoxHeight - bottomMargin
  const bracketCenterY = (bracketY1 + bracketY2) / 2
  const bracketLeftX = prefixSpace + leftMargin
  const bracketRightX = prefixSpace + viewBoxWidth - rightMargin

  const ariaLabel = title || `Matrix ${rows} by ${cols}`

  return (
    <div
      className="writingArticle__matrixCard writingArticle__codeCard--matrix"
      style={{ flex: `0 ${totalViewBoxWidth}px` }}
    >
      <div className="writingArticle__embedMatrix writingArticle__embedMatrix--full">
        <svg
          className="writingArticle__embedMatrixSvg"
          viewBox={`0 0 ${totalViewBoxWidth} ${viewBoxHeight}`}
          role="img"
          aria-label={ariaLabel}
        >
          {/* Title label */}
          {title && (
            <text
              x={prefixSpace + viewBoxWidth / 2}
              y="15"
              className="matrixLabel"
              fill="#2ddf9b"
              textAnchor="middle"
            >
              {title}
            </text>
          )}
          {/* Prefix label */}
          {prefix && (
            <text
              x={prefixSpace}
              y={bracketCenterY}
              className="matrixLabel"
              fill="var(--matrix-affix-colour)"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {prefix}
            </text>
          )}
          {/* Left bracket */}
          <path
            className="embedMatrixBracket"
            d={`M${bracketLeftX} ${bracketY1} H${bracketLeftX - 10} V${bracketY2} H${bracketLeftX}`}
          />
          {/* Right bracket */}
          <path
            className="embedMatrixBracket"
            d={`M${bracketRightX} ${bracketY1} H${bracketRightX + 10} V${bracketY2} H${bracketRightX}`}
          />
          {/* Suffix label */}
          {suffix && (
            <text
              x={bracketRightX + 16}
              y={bracketCenterY}
              className="matrixLabel"
              fill="var(--matrix-affix-colour)"
              textAnchor="start"
              dominantBaseline="middle"
            >
              {suffix}
            </text>
          )}

          {/* Matrix values */}
          {values.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <text
                key={`${rowIndex}-${colIndex}`}
                x={rowOffset + bracketLeftX + colSpacing * (colIndex + 0.5)}
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
