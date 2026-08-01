import { loadSnakeUI } from '@/ui/snake'
import { keyBoardControlManager, snakeDirection } from './control-manager'
import { gameStartDisplayUI } from '@/ui/game-start-display'
import {
  columnSize,
  isGameOver,
  matriz,
  rowSize,
  runSnakeIntervalID,
  snakePositionX,
  snakePositionY,
  snakeSpeedInMs,
  UpdateVariables,
  userPointCount,
} from '@/util/global-variables'
import { gameOverDisplayUI } from '@/ui/game-over-display'
import { togglePauseDisplayUI } from '@/ui/pause-display'
import { resetFruitUI } from '@/ui/fruit'
import { renderCountUI, renderSpeedSnakeUI } from '@/ui/game-status'
import { generateMatriz } from './screen-matriz'

export function pausedGame() {
  const element = document.getElementById('pause-button') as HTMLButtonElement
  if (!element) return

  element.disabled = snakeDirection.current === 'start'

  element.addEventListener('click', (event) => {
    event.stopImmediatePropagation()

    const customKeyBoardEvent = new KeyboardEvent('keydown', {
      code: 'Escape',
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    })

    document.dispatchEvent(customKeyBoardEvent)
  })
}

export function startGame() {
  loadSnakeUI<typeof snakeDirection.current>(matriz, snakeDirection.current)
  gameStartDisplayUI(snakeDirection.current)

  document.getElementById('run-game')?.addEventListener('click', (event) => {
    event.stopImmediatePropagation()

    const customKeyBoardEvent = new KeyboardEvent('keydown', {
      code: 'ArrowDown',
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true,
    })

    document.dispatchEvent(customKeyBoardEvent)
    gameStartDisplayUI(snakeDirection.current)
    pausedGame()
  })
}

export function runSnakeGameAgain() {
  document.getElementById('run-game')?.addEventListener('click', (event) => {
    event.stopImmediatePropagation()

    const customKeyBoardEvent = new KeyboardEvent('keydown', {
      code: 'Escape',
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    })

    document.dispatchEvent(customKeyBoardEvent)
  })
}

export function gameOver(props: { positionY: number; positionX: number }) {
  const updateVariables = new UpdateVariables()
  updateVariables.updateIsGameOver(
    matriz[props.positionY][props.positionX] !== 'void',
  )

  gameOverDisplayUI({
    speed: snakeSpeedInMs,
    score: userPointCount,
    isGameOver,
  })

  if (isGameOver) {
    resetSnakeGame()
    clearInterval(runSnakeIntervalID)
    updateVariables.updateRunSnakeIntervalID(0)
    return
  }
}

export function resetSnakeGame() {
  document.getElementById('reset-game')?.addEventListener('click', (event) => {
    event.stopImmediatePropagation()

    keyBoardControlManager({ code: 'reset' })
    togglePauseDisplayUI(snakeDirection.current)
    resetFruitUI()
    pausedGame()

    const updateVariables = new UpdateVariables()
    updateVariables.updateIsGameOver(false)
    updateVariables.updateSnakePositions({ newValueX: 12, newValueY: 12 })
    updateVariables.updateUserPointCount(0)
    updateVariables.updateSnakeSpeedInMs(250)
    updateVariables.updateColumnSize((snakePositionY + 1) * 2)
    updateVariables.updateRowSize((snakePositionX + 1) * 2)
    updateVariables.updateMatriz(
      generateMatriz({
        columnSize: columnSize,
        rowSize: rowSize,
      }),
    )

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
