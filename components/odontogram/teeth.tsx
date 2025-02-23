import React from 'react'
import Tooth from './tooth'

type TeethProps = {
  start: number
  end: number
  x: number
  y: number
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Teeth({ start, end, x, y, handleChange }: TeethProps) {
  let tooths = getArray(start, end)

  return (
    <g transform="scale(1.4)" id="gmain">
      {tooths.map((i) => (
        <Tooth
          onChange={handleChange}
          key={i}
          number={i}
          positionY={y}
          positionX={Math.abs((i - start) * 25) + x}
        />
      ))}
    </g>
  )
}

function getArray(start: number, end: number): number[] {
  if (start > end) return getInverseArray(start, end)

  const list: number[] = []
  for (var i = start; i <= end; i++) {
    list.push(i)
  }

  return list
}

function getInverseArray(start, end) {
  let list: number[] = []

  for (var i = start; i >= end; i--) {
    list.push(i)
  }

  return list
}
