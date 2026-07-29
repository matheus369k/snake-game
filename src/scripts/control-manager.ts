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
  if (code === 'reset') {
    snakeDirection.current = 'start'
    snakeDirection.previous = 'bottom'
    return
  }

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
}

type TouchControlManagerProps = {
  touchStartX: number
  touchStartY: number
  touchEndX: number
  touchEndY: number
}
export function touchControlManager(props: TouchControlManagerProps) {
  const { touchStartX, touchStartY, touchEndX, touchEndY } = props

  const calcStartToEndPositionX = Math.abs(
    Math.abs(touchStartX) - Math.abs(touchEndX),
  )
  const calcStartToEndPositionY = Math.abs(
    Math.abs(touchStartY) - Math.abs(touchEndY),
  )

  let touchDirection: keyof typeof controlsKeys =
    touchStartX > touchEndX ? 'left' : 'right'
  if (calcStartToEndPositionY > calcStartToEndPositionX) {
    touchDirection = touchStartY > touchEndY ? 'top' : 'bottom'
  }

  const customKeyBoardEvent = new KeyboardEvent('keydown', {
    code: controlsKeys[touchDirection][0],
    key: controlsKeys[touchDirection][0],
    cancelable: true,
    bubbles: true,
  })
  document.dispatchEvent(customKeyBoardEvent)
}
