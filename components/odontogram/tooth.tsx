import React, { useEffect, useReducer, useRef } from 'react'
import useContextMenu from 'contextmenu'
import 'contextmenu/ContextMenu.css'
import './Tooth.css'

type CavitiesState = {
  center: number
  top: number
  bottom: number
  left: number
  right: number
}

type ToothState = {
  Cavities: CavitiesState
  Extract: number
  Crown: number
  Filter: number
  Fracture: number
}

interface ToothProps {
  number: number
  positionX: number
  positionY: number
  onChange: (number: number, state: ToothState) => void
}

const initialState: ToothState = {
  Cavities: {
    center: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  Extract: 0,
  Crown: 0,
  Filter: 0,
  Fracture: 0
}

type Action =
  | { type: 'crown'; value: number }
  | { type: 'extract'; value: number }
  | { type: 'filter'; value: number }
  | { type: 'fracture'; value: number }
  | { type: 'carie'; zone: keyof CavitiesState | 'all'; value: number }
  | { type: 'clear' }

export default function Tooth({ number, positionX, positionY, onChange }) {
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
          Cavities: setCavities(state, action.zone, action.value)
        }
      case 'clear':
        return initialState
      default:
        throw new Error('Acción no soportada')
    }
  }

  const crown = (val: number): Action => ({ type: 'crown', value: val })
  const extract = (val: number): Action => ({ type: 'extract', value: val })
  const filter = (val: number): Action => ({ type: 'filter', value: val })
  const fracture = (val: number): Action => ({ type: 'fracture', value: val })
  const carie = (z: keyof CavitiesState | 'all', val: number): Action => ({
    type: 'carie',
    value: val,
    zone: z
  })
  const clear = (): Action => ({ type: 'clear' })

  const [toothState, dispatch] = useReducer(reducer, initialState)
  const [contextMenu, useCM] = useContextMenu({ submenuSymbol: '>' })

  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    onChange(number, toothState)
  }, [toothState, onChange, number])

  // Done SubMenu
  const doneSubMenu = (place: keyof CavitiesState, value: number) => ({
    Cavity: () => dispatch(carie(place, value)),
    'Cavities All': () => dispatch(carie('all', value)),
    Absent: () => dispatch(extract(value)),
    Crown: () => dispatch(crown(value))
  })
  // Todo SubMenu
  const todoSubMenu = (place: keyof CavitiesState, value: number) => ({
    Cavity: () => dispatch(carie(place, value)),
    'Cavities All': () => dispatch(carie('all', value)),
    Absent: () => dispatch(extract(value)),
    Crown: () => dispatch(crown(value)),
    'Filtered Out': () => dispatch(filter(value)),
    Fractured: () => dispatch(fracture(value))
  })

  // Main ContextMenu
  const menuConfig = (place: keyof CavitiesState) => ({
    Done: doneSubMenu(place, 1),
    'To Do': todoSubMenu(place, 2),
    'JSX line': <hr></hr>,
    'Clear All': () => dispatch(clear())
  })

  const getClassNamesByZone = (zone: keyof CavitiesState): string => {
    return toothState.Cavities[zone] === 1
      ? 'to-do'
      : toothState.Cavities[zone] === 2
      ? 'done'
      : ''
  }

  // Tooth position
  const translate = `translate(${positionX},${positionY})`

  return (
    <svg className="tooth">
      <g transform={translate}>
        <polygon
          points="0,0 20,0 15,5 5,5"
          onContextMenu={useCM(menuConfig('top'))}
          className={getClassNamesByZone('top')}
        />
        <polygon
          points="5,15 15,15 20,20 0,20"
          onContextMenu={useCM(menuConfig('bottom'))}
          className={getClassNamesByZone('bottom')}
        />
        <polygon
          points="15,5 20,0 20,20 15,15"
          onContextMenu={useCM(menuConfig('left'))}
          className={getClassNamesByZone('left')}
        />
        <polygon
          points="0,0 5,5 5,15 0,20"
          onContextMenu={useCM(menuConfig('right'))}
          className={getClassNamesByZone('right')}
        />
        <polygon
          points="5,5 15,5 15,15 5,15"
          onContextMenu={useCM(menuConfig('center'))}
          className={getClassNamesByZone('center')}
        />
        {drawToothActions()}
        <text
          x="6"
          y="30"
          stroke="navy"
          fill="navy"
          strokeWidth="0.1"
          className="text-[8px]"
        >
          {number}
        </text>
      </g>
      {contextMenu}
    </svg>
  )

  function setCavities(
    prevState: ToothState,
    zone: keyof CavitiesState | 'all',
    value: number
  ): CavitiesState {
    const newCavities = { ...prevState.Cavities }
    if (zone === 'all') {
      Object.keys(newCavities).forEach((key) => {
        newCavities[key as keyof CavitiesState] = value
      })
    } else {
      newCavities[zone] = value
    }
    return newCavities
  }

  function drawToothActions() {
    if (toothState.Extract > 0) {
      return (
        <g stroke={toothState.Extract === 1 ? 'red' : 'blue'}>
          <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
          <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
        </g>
      )
    }
    if (toothState.Crown > 0) {
      return (
        <circle
          cx="10"
          cy="10"
          r="10"
          fill="none"
          stroke="blue"
          strokeWidth="2"
        />
      )
    }
    return null
  }
}
