import { runningCurrentDirectionKeyBoard } from './current-direction'

export const controlsKeys = {
  top: ['ArrowUp', 'KeyW'],
  right: ['ArrowRight', 'KeyD'],
  bottom: ['ArrowDown', 'KeyS'],
  left: ['ArrowLeft', 'KeyA'],
  stop: ['Escape', 'Space'],
}

type ControlsDirectionName = keyof typeof controlsKeys | 'start'
type SneakDirection = {
  previous: ControlsDirectionName
  current: ControlsDirectionName
}

export const sneakDirection: SneakDirection = {
  previous: 'bottom',
  current: 'start',
}
const controlsKeysArray = Object.entries(controlsKeys) as [
  ControlsDirectionName,
  string[],
][]

type KeyBoardControlManagerProps = Pick<KeyboardEvent, 'code'>

export function keyBoardControlManager({ code }: KeyBoardControlManagerProps) {
  const currentDirectionKeyCode =
    runningCurrentDirectionKeyBoard<ControlsDirectionName>({
      keyBoardName: code,
      controlsKeys: controlsKeysArray,
    })

  const notTurnedFromTopToBottom =
    sneakDirection.current === 'bottom' && currentDirectionKeyCode === 'top'
  if (notTurnedFromTopToBottom) return

  const notTurnedFromBottomToTop =
    sneakDirection.current === 'top' && currentDirectionKeyCode === 'bottom'
  if (notTurnedFromBottomToTop) return

  const notTurnedFromLeftToRight =
    sneakDirection.current === 'left' && currentDirectionKeyCode === 'right'
  if (notTurnedFromLeftToRight) return

  const notTurnedFromRightToLeft =
    sneakDirection.current === 'right' && currentDirectionKeyCode === 'left'
  if (notTurnedFromRightToLeft) return

  const { current, previous } = sneakDirection
  const notClickedInStopTwoTimes =
    sneakDirection.current === 'stop' && currentDirectionKeyCode === 'stop'
  if (notClickedInStopTwoTimes) {
    sneakDirection.current = previous === 'start' ? 'bottom' : previous
    sneakDirection.previous = current
    return
  }

  const sneakHeadElement = document.querySelector('.sneak-head')
  const sneakHeadID = sneakHeadElement?.id.split('/')
  let sneakHeadCoordinateX = Number(sneakHeadID?.[0].split('X-')[1])
  let sneakHeadCoordinateY = Number(sneakHeadID?.[1].split('Y-')[1])
  let sneakElement = null
  switch (currentDirectionKeyCode) {
    case 'top':
      sneakElement = document.getElementById(
        `X-${sneakHeadCoordinateX - 1}/Y-${sneakHeadCoordinateY}`,
      )
      break
    case 'bottom':
      sneakElement = document.getElementById(
        `X-${sneakHeadCoordinateX + 1}/Y-${sneakHeadCoordinateY}`,
      )
      break
    case 'left':
      sneakElement = document.getElementById(
        `X-${sneakHeadCoordinateX}/Y-${sneakHeadCoordinateY - 1}`,
      )
      break
    case 'right':
      sneakElement = document.getElementById(
        `X-${sneakHeadCoordinateX}/Y-${sneakHeadCoordinateY + 1}`,
      )
      break
  }

  if (sneakElement && !sneakElement.classList.contains('empty-field')) return

  if (currentDirectionKeyCode) {
    sneakDirection.current = currentDirectionKeyCode
    sneakDirection.previous = current
    return
  }

  if (code === 'reset') {
    sneakDirection.current = 'start'
    sneakDirection.previous = 'bottom'
  }
}

type DragControlManagerProps = Pick<DragEvent, 'x' | 'y'> & {
  dragStartX: number
  dragStartY: number
}
export function dragControlManager(props: DragControlManagerProps) {
  const { dragStartX, dragStartY, x: dragEndX, y: dragEndY } = props

  const calcStartToEndPositionX = Math.abs(
    Math.abs(dragStartX) - Math.abs(dragEndX),
  )
  const calcStartToEndPositionY = Math.abs(
    Math.abs(dragStartY) - Math.abs(dragEndY),
  )

  let dragDirection: keyof typeof controlsKeys =
    dragStartX > dragEndX ? 'left' : 'right'
  if (calcStartToEndPositionY > calcStartToEndPositionX) {
    dragDirection = dragStartY > dragEndY ? 'top' : 'bottom'
  }

  const customKeyBoardEvent = new KeyboardEvent('keydown', {
    code: controlsKeys[dragDirection][0],
    key: controlsKeys[dragDirection][0],
    cancelable: true,
    bubbles: true,
  })
  document.dispatchEvent(customKeyBoardEvent)
}
