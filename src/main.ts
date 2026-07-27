import { loadSneakUI } from '@scripts/render-sneak-ui'
import { generateMatriz, updateMatriz } from '@scripts/screen-matriz'
import { calculateSneakNextPosition } from '@scripts/calculate-sneak-next-position'
import { loadFruitUI, resetFruitUI } from '@scripts/render-fruit-ui'
import {
  dragControlManager,
  keyBoardControlManager,
  sneakDirection,
} from '@scripts/control-manager'
import {
  renderCountUI,
  togglePauseDisplayUI,
  renderSpeedSneakUI,
  gameOverDisplayUI,
} from '@scripts/render-display-iu'
import '@/style.css'

let runSneakIntervalID: number
let isGameOver: boolean

let sneakPositionY = 12
let sneakPositionX = 12

let userPointCount = 0
let sneakSpeedInMs = 250

let columnSize = (sneakPositionY + 1) * 2
let rowSize = (sneakPositionX + 1) * 2
let matriz = generateMatriz({
  columnSize,
  rowSize,
})

let dragStartX = 0
let dragStartY = 0

document.addEventListener('dragstart', (props) => {
  dragStartX = props.x
  dragStartY = props.y
})

document.addEventListener('dragend', (props) => {
  dragControlManager({
    dragStartX,
    dragStartY,
    x: props.x,
    y: props.y,
  })
})

document.addEventListener('keydown', (props) => {
  keyBoardControlManager({ code: props.code })
  togglePauseDisplayUI(sneakDirection.current)

  const isPaused = sneakDirection.current === 'stop'
  if (isPaused) {
    runSneakGameAgain()
    resetSneakGame()

    clearInterval(runSneakIntervalID)
    runSneakIntervalID = 0
    return
  }

  if (runSneakIntervalID) return
  runningSneakGame()
})

document.addEventListener('DOMContentLoaded', () => {
  loadSneakUI<typeof sneakDirection.current>(matriz, sneakDirection.current)
})

function runSneakGameAgain() {
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

function gameOver() {
  isGameOver = matriz[sneakPositionY][sneakPositionX] !== 'void'
  gameOverDisplayUI({
    speed: sneakSpeedInMs,
    score: userPointCount,
    isGameOver,
  })

  if (isGameOver) {
    resetSneakGame()
    clearInterval(runSneakIntervalID)
    runSneakIntervalID = 0
    return
  }
}

function resetSneakGame() {
  document.getElementById('reset-game')?.addEventListener('click', () => {
    keyBoardControlManager({ code: 'reset' })
    togglePauseDisplayUI(sneakDirection.current)
    resetFruitUI()

    isGameOver = false

    sneakPositionY = 12
    sneakPositionX = 12

    userPointCount = 0
    sneakSpeedInMs = 250

    columnSize = (sneakPositionY + 1) * 2
    rowSize = (sneakPositionX + 1) * 2
    matriz = generateMatriz({
      columnSize,
      rowSize,
    })

    renderCountUI(userPointCount)
    renderSpeedSneakUI(sneakSpeedInMs)
    gameOverDisplayUI({
      speed: sneakSpeedInMs,
      score: userPointCount,
      isGameOver,
    })

    const customStartLoadDom = new Event('DOMContentLoaded')
    document.dispatchEvent(customStartLoadDom)
  })
}

function runningSneakGame() {
  runSneakIntervalID = setInterval(() => {
    const nextPosition = calculateSneakNextPosition({
      sneakDirection: sneakDirection.current,
      positionY: sneakPositionY,
      positionX: sneakPositionX,
      columnSize,
      rowSize,
    })

    sneakPositionY = nextPosition.positionY
    sneakPositionX = nextPosition.positionX

    gameOver()

    matriz = updateMatriz({
      nextPositionY: sneakPositionY,
      nextPositionX: sneakPositionX,
      userPointCount,
      matriz,
    })

    loadSneakUI<typeof sneakDirection.current>(matriz, sneakDirection.current)

    const eatingCount = loadFruitUI({
      columnSize,
      rowSize,
    })

    if (eatingCount) {
      userPointCount = userPointCount + eatingCount
      sneakSpeedInMs = sneakSpeedInMs - userPointCount / 10

      renderCountUI(userPointCount - 1)
      renderSpeedSneakUI(sneakSpeedInMs)

      clearInterval(runSneakIntervalID)
      runSneakIntervalID = 0
      runningSneakGame()
    }
  }, sneakSpeedInMs)
}
