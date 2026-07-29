import { loadSnakeUI } from '@scripts/render-snake-ui'
import { generateMatriz, updateMatriz } from '@scripts/screen-matriz'
import { calculateSnakeNextPosition } from '@scripts/calculate-snake-next-position'
import { loadFruitUI, resetFruitUI } from '@scripts/render-fruit-ui'
import {
  touchControlManager,
  keyBoardControlManager,
  snakeDirection,
} from '@scripts/control-manager'
import {
  renderCountUI,
  togglePauseDisplayUI,
  renderSpeedSnakeUI,
  gameOverDisplayUI,
} from '@scripts/render-display-iu'
import '@/style.css'

let runSnakeIntervalID: number
let isGameOver: boolean = false

let snakePositionY = 12
let snakePositionX = 12

let userPointCount = 0
let snakeSpeedInMs = 250

let columnSize = (snakePositionY + 1) * 2
let rowSize = (snakePositionX + 1) * 2
let matriz = generateMatriz({
  columnSize,
  rowSize,
})

let touchStartX = 0
let touchStartY = 0

document.addEventListener('touchstart', (props) => {
  touchStartX = props.changedTouches[0].screenX
  touchStartY = props.changedTouches[0].screenY
})

document.addEventListener('touchend', (props) => {
  touchControlManager({
    touchEndX: props.changedTouches[0].screenX,
    touchEndY: props.changedTouches[0].screenY,
    touchStartX,
    touchStartY,
  })
})

document.addEventListener('keydown', (props) => {
  if (isGameOver) return
  keyBoardControlManager({ code: props.code })
  togglePauseDisplayUI(snakeDirection.current)

  const isPaused = snakeDirection.current === 'stop'
  if (isPaused) {
    runSnakeGameAgain()
    resetSnakeGame()

    clearInterval(runSnakeIntervalID)
    runSnakeIntervalID = 0
    return
  }

  if (runSnakeIntervalID) return
  runningSnakeGame()
})

document.addEventListener('DOMContentLoaded', () => {
  loadSnakeUI<typeof snakeDirection.current>(matriz, snakeDirection.current)
})

function runSnakeGameAgain() {
  document.getElementById('run-game')?.addEventListener('click', () => {
    const customKeyBoardEvent = new KeyboardEvent('keydown', {
      code: 'Escape',
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    })

    document.dispatchEvent(customKeyBoardEvent)
  })
}

function gameOver(props: { positionY: number; positionX: number }) {
  isGameOver = matriz[props.positionY][props.positionX] !== 'void'
  gameOverDisplayUI({
    speed: snakeSpeedInMs,
    score: userPointCount,
    isGameOver,
  })

  if (isGameOver) {
    resetSnakeGame()
    clearInterval(runSnakeIntervalID)
    runSnakeIntervalID = 0
    return
  }
}

function resetSnakeGame() {
  document.getElementById('reset-game')?.addEventListener('click', () => {
    keyBoardControlManager({ code: 'reset' })
    togglePauseDisplayUI(snakeDirection.current)
    resetFruitUI()

    isGameOver = false

    snakePositionY = 12
    snakePositionX = 12

    userPointCount = 0
    snakeSpeedInMs = 250

    columnSize = (snakePositionY + 1) * 2
    rowSize = (snakePositionX + 1) * 2
    matriz = generateMatriz({
      columnSize,
      rowSize,
    })

    renderCountUI(userPointCount)
    renderSpeedSnakeUI(snakeSpeedInMs)
    gameOverDisplayUI({
      speed: snakeSpeedInMs,
      score: userPointCount,
      isGameOver,
    })

    const customStartLoadDom = new Event('DOMContentLoaded')
    document.dispatchEvent(customStartLoadDom)
  })
}

function runningSnakeGame() {
  runSnakeIntervalID = setInterval(() => {
    const nextPosition = calculateSnakeNextPosition({
      snakeDirection: snakeDirection.current,
      positionY: snakePositionY,
      positionX: snakePositionX,
      columnSize,
      rowSize,
    })

    gameOver({
      positionY: nextPosition.positionY,
      positionX: nextPosition.positionX,
    })

    snakePositionY = nextPosition.positionY
    snakePositionX = nextPosition.positionX

    matriz = updateMatriz({
      nextPositionY: snakePositionY,
      nextPositionX: snakePositionX,
      userPointCount,
      matriz,
    })

    loadSnakeUI<typeof snakeDirection.current>(matriz, snakeDirection.current)

    const eatingCount = loadFruitUI({
      columnSize,
      rowSize,
    })

    if (eatingCount) {
      userPointCount = userPointCount + eatingCount
      snakeSpeedInMs = snakeSpeedInMs - userPointCount / 10

      renderCountUI(userPointCount - 1)
      renderSpeedSnakeUI(snakeSpeedInMs)

      clearInterval(runSnakeIntervalID)
      runSnakeIntervalID = 0
      runningSnakeGame()
    }
  }, snakeSpeedInMs)
}
