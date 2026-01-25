/**
 * Created with d3-3d, https://github.com/niekes/d3-3d
 */
import {
  color,
  drag,
  range,
  scaleOrdinal,
  schemeCategory10,
  select,
  selectAll,
} from 'https://cdn.skypack.dev/d3@7.8.5'

import {
  gridPlanes3D,
  lineStrips3D,
  points3D,
} from 'https://cdn.skypack.dev/d3-3d@1.0.0'
;(() => {
  const origin = { x: 360, y: 280 }
  const rows = 10
  const scale = 20
  const key = (d) => d.id
  const startAngle = Math.PI / 4
  const colorScale = scaleOrdinal(schemeCategory10)

  let scatter = []
  let yLine = []
  let xGrid = []
  let beta = 0
  let alpha = 0
  let mx,
    my,
    mouseX = 0,
    mouseY = 0

  const svg = select('#scatterplot-3d-svg')
    .call(drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd))
    .append('g')

  // Create tooltip
  const tooltip = select('body')
    .append('div')
    .attr('class', 'scatterplot-tooltip')
    .style('position', 'absolute')
    .style('padding', '8px')
    .style('background', 'rgba(0, 0, 0, 0.8)')
    .style('color', 'white')
    .style('border-radius', '4px')
    .style('font-size', '12px')
    .style('font-family', 'system-ui, sans-serif')
    .style('pointer-events', 'none')
    .style('opacity', 0)
    .style('z-index', 1000)

  const grid3d = gridPlanes3D()
    .rows(rows * 2 + 1)
    .origin(origin)
    .rotateY(startAngle)
    .rotateX(-startAngle)
    .scale(scale)

  const points3d = points3D()
    .origin(origin)
    .rotateY(startAngle)
    .rotateX(-startAngle)
    .scale(scale)

  const yScale3d = lineStrips3D()
    .origin(origin)
    .rotateY(startAngle)
    .rotateX(-startAngle)
    .scale(scale)

  function round(num, places = 2) {
    const mult = Math.pow(10, places)
    return Math.round((num + Number.EPSILON) * mult) / mult
  }

  function processData(data, tt) {
    /* ----------- GRID ----------- */

    const xGrid = svg.selectAll('path.grid').data(data[0], key)

    xGrid
      .enter()
      .append('path')
      .attr('class', 'd3-3d grid')
      .merge(xGrid)
      .attr('stroke', 'black')
      .attr('stroke-width', 0.3)
      .attr('fill', (d) => (d.ccw ? '#eee' : '#aaa'))
      .attr('fill-opacity', 0.9)
      .attr('d', grid3d.draw)

    xGrid.exit().remove()

    /* ----------- POINTS ----------- */

    const points = svg.selectAll('circle').data(data[1], key)

    points
      .enter()
      .append('circle')
      .attr('class', 'd3-3d')
      .attr('opacity', 0)
      .attr('cx', posPointX)
      .attr('cy', posPointY)
      .on('mouseover', function (event, d) {
        select(this).attr('r', 5)
        tooltip.transition().duration(200).style('opacity', 1)
        tooltip
          .html(
            `<strong>id: ${d.label || '?'}</strong><br/>` +
              `d1: ${round(d.x)}<br/>` +
              `d2: ${round(-d.y)}<br/>` +
              `d3: ${round(d.z)}`,
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 10 + 'px')
      })
      .on('mouseout', function () {
        select(this).attr('r', 3)
        tooltip.transition().duration(200).style('opacity', 0)
      })
      .merge(points)
      .transition()
      .duration(tt)
      .attr('r', 3)
      .attr('stroke', (d) => color(colorScale(d.id)).darker(3))
      .attr('fill', (d) => colorScale(d.id))
      .attr('opacity', 1)
      .attr('cx', posPointX)
      .attr('cy', posPointY)

    points.exit().remove()

    /* ----------- POINT LABELS ----------- */

    const pointLabels = svg.selectAll('text.pointLabel').data(data[1], key)

    pointLabels
      .enter()
      .append('text')
      .attr('class', 'd3-3d pointLabel')
      .attr('font-family', 'system-ui, sans-serif')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .attr('opacity', 0)
      .merge(pointLabels)
      .transition()
      .duration(tt)
      .attr('opacity', (d) => (d.label ? 1 : 0))
      .attr('x', (d) => d.projected.x)
      .attr('y', (d) => d.projected.y - 8)
      .text((d) => d.label || '')

    pointLabels.exit().remove()

    /* ----------- y-Scale ----------- */

    const yScale = svg.selectAll('path.yScale').data(data[2])

    yScale
      .enter()
      .append('path')
      .attr('class', 'd3-3d yScale')
      .merge(yScale)
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5)
      .attr('d', yScale3d.draw)

    yScale.exit().remove()

    /* ----------- y-Scale Text ----------- */

    const yText = svg.selectAll('text.yText').data(data[2][0])

    yText
      .enter()
      .append('text')
      .attr('class', 'd3-3d yText')
      .attr('font-family', 'system-ui, sans-serif')
      .attr('font-size', '10px')
      .merge(yText)
      .each(function (d) {
        d.centroid = { x: d.rotated.x, y: d.rotated.y, z: d.rotated.z }
      })
      .attr('x', (d) => d.projected.x)
      .attr('y', (d) => d.projected.y)
      .text((d) => (d.y !== 0 ? `_ ${round(-d.y)}` : ''))

    yText.exit().remove()

    selectAll('.d3-3d').sort(points3d.sort)
  }

  function posPointX(d) {
    return d.projected.x
  }

  function posPointY(d) {
    return d.projected.y
  }

  function init() {
    xGrid = []
    scatter = []
    yLine = []

    // Check if custom points are provided
    const allPoints = window.scatterplot3dPoints
    const labels = window.scatterplot3dLabels || []
    const currentIndex = window.scatterplot3dCurrentIndex || 0

    // Calculate maxValue from all points
    let calculatedMaxValue = 1
    if (allPoints && allPoints.length > 0) {
      const flatPoints = allPoints.flat()
      const allValues = flatPoints.flatMap((point) => [
        Math.abs(point[0]),
        Math.abs(point[1]),
        Math.abs(point[2]),
      ])
      calculatedMaxValue = Math.ceil(Math.max(...allValues))
    }

    // Update grid and scale parameters
    const increment = calculatedMaxValue / rows
    const scale = 200 / calculatedMaxValue

    // Update 3D projections with new scale
    grid3d.rows(rows * 2 + 1).scale(scale)
    points3d.scale(scale)
    yScale3d.scale(scale)

    // Use provided points at current index
    const customPoints = allPoints[currentIndex] || allPoints[0]
    customPoints.forEach((point, idx) => {
      scatter.push({
        x: point[0],
        y: -point[1],
        z: point[2],
        id: 'point-' + idx,
        label: labels[idx] || '',
      })
    })

    // Create grid
    for (let z = -calculatedMaxValue; z <= calculatedMaxValue; z += increment) {
      for (
        let x = -calculatedMaxValue;
        x <= calculatedMaxValue;
        x += increment
      ) {
        xGrid.push({ x: x, y: 0, z: z })
      }
    }

    range(
      -calculatedMaxValue,
      calculatedMaxValue + increment,
      increment,
    ).forEach((d) => {
      yLine.push({ x: 0, y: d, z: 0 })
    })

    const data = [grid3d(xGrid), points3d(scatter), yScale3d([yLine])]
    processData(data, 1000)
  }

  function dragStart(event) {
    mx = event.x
    my = event.y
  }

  function dragged(event) {
    beta = (event.x - mx + mouseX) * (Math.PI / 230)
    alpha = (event.y - my + mouseY) * (Math.PI / 230) * -1

    const data = [
      grid3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(xGrid),
      points3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(scatter),
      yScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([yLine]),
    ]

    processData(data, 0)
  }

  function dragEnd(event) {
    mouseX = event.x - mx + mouseX
    mouseY = event.y - my + mouseY
  }

  // Expose init function globally so React component can call it
  window.scatterplot3dInit = init

  init()
})()
