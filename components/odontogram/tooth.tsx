import React, { useEffect, useReducer, useRef } from 'react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent
} from '@/components/ui/context-menu'

interface ToothProps {
  number: number
  positionX: number
  positionY: number
  onChange: (number: number, state: ToothState) => void
}

interface ToothState {
  Cavities: {
    center: number
    top: number
    bottom: number
    left: number
    right: number
  }
  Extract: number
  Crown: number
  Filter: number
  Fracture: number
}

const initialState: ToothState = {
  Cavities: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
  Extract: 0,
  Crown: 0,
  Filter: 0,
  Fracture: 0
}

type Action =
  | { type: 'crown' | 'extract' | 'filter' | 'fracture'; value: number }
  | { type: 'carie'; zone: string; value: number }
  | { type: 'clear' }

function reducer(state: ToothState, action: Action): ToothState {
  switch (action.type) {
    case 'crown':
      return { ...state, Crown: action.value }
    case 'extract':
      return { ...state, Extract: action.value }
    case 'filter':
      return { ...state, Filter: action.value }
    case 'fracture':
      return { ...state, Fracture: action.value }
    case 'carie':
      return {
        ...state,
        Cavities:
          action.zone === 'all'
            ? {
                center: action.value,
                top: action.value,
                bottom: action.value,
                left: action.value,
                right: action.value
              }
            : { ...state.Cavities, [action.zone]: action.value }
      }
    case 'clear':
      return initialState
    default:
      throw new Error()
  }
}

export default function Tooth({
  number,
  positionX,
  positionY,
  onChange
}: ToothProps) {
  const [toothState, dispatch] = useReducer(reducer, initialState)
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    onChange(number, toothState)
  }, [toothState, number])

  const translate = `translate(${positionX},${positionY})`

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <svg className="tooth">
          <g transform={translate}>
            {['top', 'bottom', 'left', 'right', 'center'].map((zone) => (
              <polygon
                key={zone}
                points={getPolygonPoints(zone)}
                className={getClassNamesByZone(zone, toothState)}
              />
            ))}
            {drawToothActions(toothState)}
            <text
              x="6"
              y="30"
              strokeWidth="0.1"
              className="text-[8px] fill-greenDark stroke-greenDark"
            >
              {number}
            </text>
          </g>
        </svg>
      </ContextMenuTrigger>

      <ContextMenuContent>
        {/* Submenú To Do */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>To Do</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem
              onClick={() => dispatch({ type: 'carie', zone: 'all', value: 1 })}
            >
              Todas las caries
            </ContextMenuItem>
            {['center', 'top', 'bottom', 'left', 'right'].map((zone) => (
              <ContextMenuItem
                key={zone}
                onClick={() => dispatch({ type: 'carie', zone, value: 1 })}
              >
                Carie - {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </ContextMenuItem>
            ))}
            <ContextMenuItem
              onClick={() => dispatch({ type: 'extract', value: 1 })}
            >
              Ausente
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => dispatch({ type: 'crown', value: 1 })}
            >
              Corona
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => dispatch({ type: 'filter', value: 1 })}
            >
              Filtrado
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => dispatch({ type: 'fracture', value: 1 })}
            >
              Fracturado
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Submenú Done */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>Realizado</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem
              onClick={() => dispatch({ type: 'carie', zone: 'all', value: 2 })}
            >
              Todas las caries
            </ContextMenuItem>
            {['center', 'top', 'bottom', 'left', 'right'].map((zone) => (
              <ContextMenuItem
                key={zone}
                onClick={() => dispatch({ type: 'carie', zone, value: 2 })}
              >
                Carie - {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </ContextMenuItem>
            ))}
            <ContextMenuItem
              onClick={() => dispatch({ type: 'extract', value: 2 })}
            >
              Ausente
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => dispatch({ type: 'crown', value: 2 })}
            >
              Corona
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuItem onClick={() => dispatch({ type: 'clear' })}>
          Borrar todo
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function getPolygonPoints(zone: string): string {
  const points: Record<string, string> = {
    top: '0,0 20,0 15,5 5,5',
    bottom: '5,15 15,15 20,20 0,20',
    left: '15,5 20,0 20,20 15,15',
    right: '0,0 5,5 5,15 0,20',
    center: '5,5 15,5 15,15 5,15'
  }
  return points[zone] || ''
}

function getClassNamesByZone(zone: string, state: ToothState): string {
  return state.Cavities[zone] === 1
    ? 'to-do'
    : state.Cavities[zone] === 2
    ? 'done'
    : ''
}

function drawToothActions(state: ToothState) {
  let otherFigures: JSX.Element | null = null

  if (state.Extract > 0) {
    otherFigures = (
      <g stroke={state.Extract === 1 ? 'red' : 'blue'}>
        <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
        <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
      </g>
    )
  }

  if (state.Fracture > 0) {
    otherFigures = (
      <g stroke={state.Fracture === 1 ? 'red' : 'blue'}>
        <line x1="0" y1="10" x2="20" y2="10" strokeWidth="2"></line>
      </g>
    )
  }

  if (state.Filter > 0) {
    otherFigures = (
      <g stroke={state.Filter === 1 ? 'red' : 'blue'}>
        <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
      </g>
    )
  }

  if (state.Crown > 0) {
    otherFigures = (
      <circle
        cx="10"
        cy="10"
        r="10"
        fill="none"
        stroke={state.Crown === 1 ? 'red' : 'blue'}
        strokeWidth="2"
      />
    )
  }

  return otherFigures
}
