'use client'

type MatrixValue = number | string

type MatrixProps = {
  values: MatrixValue[][]
  title?: LabelProps
  prefix?: LabelProps
  suffix?: LabelProps
}

type LabelProps = {
  text: string
  colour?: string
}

export default function Matrix({ values, title, prefix, suffix }: MatrixProps) {
  if (!values || values.length === 0) {
    return null
  }

  const rows = values.length
  const cols = values[0]?.length ?? 0

  // Base dimensions
  const viewBoxWidth = cols * 80 + 72
  const viewBoxHeight = rows * 34 + 56
  const leftMargin = 18
  const rightMargin = 18
  const topMargin = 24
  const bottomMargin = 16
  const rowOffset = 6
  const rowSpacingAdd = 2

  // Add extra space for prefix/suffix labels
  const prefixSpace = prefix ? prefix.text.length * 10 : 0
  const suffixSpace = suffix ? suffix.text.length * 10 : 0
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

  const ariaLabel = title?.text || `Matrix ${rows} by ${cols}`

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
              y="24"
              className="matrixLabel"
              fill={title?.colour || 'var(--matrix-label-colour)'}
              textAnchor="middle"
            >
              {title?.text}
            </text>
          )}
          {/* Prefix label */}
          {prefix && (
            <text
              x={prefixSpace + 2}
              y={bracketCenterY}
              className="matrixLabel"
              fill={prefix?.colour || 'var(--matrix-affix-colour)'}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {prefix?.text}
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
              fill={suffix?.colour || 'var(--matrix-affix-colour)'}
              textAnchor="start"
              dominantBaseline="middle"
            >
              {suffix?.text}
            </text>
          )}

          {/* Matrix values */}
          {values.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <text
                key={`${rowIndex}-${colIndex}`}
                x={rowOffset + bracketLeftX + colSpacing * (colIndex + 0.5)}
                y={topMargin + rowSpacing * (rowIndex + 1)}
                className={`embedMatrixNumber embedMatrixNumber--row-${rowIndex}`}
                fill="var(--matrix-colour)"
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
