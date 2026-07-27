import { runningCurrentDirectionKeyBoard } from './current-direction'

export const controlsKeys = {
  top: ['ArrowUp', 'KeyW'],
  right: ['ArrowRight', 'KeyD'],
  bottom: ['ArrowDown', 'KeyS'],
  left: ['ArrowLeft', 'KeyA'],
  stop: ['Escape', 'Space'],
}

type ControlsDirectionName = keyof typeof controlsKeys | 'start'
type SnakeDirection = {
  previous: ControlsDirectionName
  current: ControlsDirectionName
}

export const snakeDirection: SnakeDirection = {
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
    snakeDirection.current === 'bottom' && currentDirectionKeyCode === 'top'
  if (notTurnedFromTopToBottom) return

  const notTurnedFromBottomToTop =
    snakeDirection.current === 'top' && currentDirectionKeyCode === 'bottom'
  if (notTurnedFromBottomToTop) return

  const notTurnedFromLeftToRight =
    snakeDirection.current === 'left' && currentDirectionKeyCode === 'right'
  if (notTurnedFromLeftToRight) return

  const notTurnedFromRightToLeft =
    snakeDirection.current === 'right' && currentDirectionKeyCode === 'left'
  if (notTurnedFromRightToLeft) return

  const { current, previous } = snakeDirection
  const notClickedInStopTwoTimes =
    snakeDirection.current === 'stop' && currentDirectionKeyCode === 'stop'
  if (notClickedInStopTwoTimes) {
    snakeDirection.current = previous === 'start' ? 'bottom' : previous
    snakeDirection.previous = current
    return
  }

  const snakeHeadElement = document.querySelector('.snake-head')
  const snakeHeadID = snakeHeadElement?.id.split('/')
  let snakeHeadCoordinateX = Number(snakeHeadID?.[0].split('X-')[1])
  let snakeHeadCoordinateY = Number(snakeHeadID?.[1].split('Y-')[1])
  let snakeElement = null
  switch (currentDirectionKeyCode) {
    case 'top':
      snakeElement = document.getElementById(
        `X-${snakeHeadCoordinateX - 1}/Y-${snakeHeadCoordinateY}`,
      )
      break
    case 'bottom':
      snakeElement = document.getElementById(
        `X-${snakeHeadCoordinateX + 1}/Y-${snakeHeadCoordinateY}`,
      )
      break
    case 'left':
      snakeElement = document.getElementById(
        `X-${snakeHeadCoordinateX}/Y-${snakeHeadCoordinateY - 1}`,
      )
      break
    case 'right':
      snakeElement = document.getElementById(
        `X-${snakeHeadCoordinateX}/Y-${snakeHeadCoordinateY + 1}`,
      )
      break
  }

  if (snakeElement && !snakeElement.classList.contains('empty-field')) return

  if (currentDirectionKeyCode) {
    snakeDirection.current = currentDirectionKeyCode
    snakeDirection.previous = current
    return
  }

  if (code === 'reset') {
    snakeDirection.current = 'start'
    snakeDirection.previous = 'bottom'
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
