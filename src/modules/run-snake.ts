import { calculateSnakeNextPosition } from '@/util/calculate-snake-next-position'
import {
  columnSize,
  matriz,
  rowSize,
  runSnakeIntervalID,
  snakePositionX,
  snakePositionY,
  snakeSpeedInMs,
  UpdateVariables,
  userPointCount,
} from '@/util/global-variables'
import { snakeDirection } from './control-manager'
import { gameOver } from './control-display'
import { updateMatriz } from './screen-matriz'
import { loadSnakeUI } from '@/ui/snake'
import { loadFruitUI } from '@/ui/fruit'
import { renderCountUI, renderSpeedSnakeUI } from '@/ui/game-status'
import { gameStartDisplayUI } from '@/ui/game-start-display'

export function runningSnakeGame() {
  const updateVariables = new UpdateVariables()
  gameStartDisplayUI(snakeDirection.current)
  let loadCount = 0

  const intervalID = setInterval(() => {
    const nextPosition = calculateSnakeNextPosition({
      snakeDirection: snakeDirection.current,
      positionY: snakePositionY,
      positionX: snakePositionX,
      columnSize: columnSize,
      rowSize: rowSize,
    })

    gameOver({
      positionY: nextPosition.positionY,
      positionX: nextPosition.positionX,
    })

    updateVariables.updateSnakePositions({
      newValueX: nextPosition.positionX,
      newValueY: nextPosition.positionY,
    })

    updateVariables.updateMatriz(
      updateMatriz({
        nextPositionY: snakePositionY,
        nextPositionX: snakePositionX,
        userPointCount: userPointCount,
        matriz: matriz,
      }),
    )

    loadSnakeUI<typeof snakeDirection.current>(matriz, snakeDirection.current)
    updatePointCountAndSnakeSpeed(loadCount)
    loadCount++
  }, snakeSpeedInMs)

  updateVariables.updateRunSnakeIntervalID(intervalID)
}

function updatePointCountAndSnakeSpeed(loadCount: number) {
  const updateVariables = new UpdateVariables()
  const eatingCount = loadFruitUI({
    columnSize,
    rowSize,
  })

  if (eatingCount && loadCount) {
    updateVariables.updateUserPointCount(userPointCount + eatingCount)
    updateVariables.updateSnakeSpeedInMs(snakeSpeedInMs - userPointCount / 10)

    renderCountUI(userPointCount)
    renderSpeedSnakeUI(snakeSpeedInMs)

    clearInterval(runSnakeIntervalID)
    updateVariables.updateRunSnakeIntervalID(0)
    runningSnakeGame()
  }
}
