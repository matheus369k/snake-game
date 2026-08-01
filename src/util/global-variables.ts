import type { MatrizType } from '@/@types/types'
import { generateMatriz } from '@/modules/screen-matriz'

export let runSnakeIntervalID: number

export let isGameOver: boolean = false

export let snakePositionY = 12
export let snakePositionX = 12

export let userPointCount = 0
export let snakeSpeedInMs = 250

export let columnSize = (snakePositionY + 1) * 2
export let rowSize = (snakePositionX + 1) * 2
export let matriz = generateMatriz({
  columnSize,
  rowSize,
})

export let touchStartX = 0
export let touchStartY = 0

export class UpdateVariables {
  public updateRunSnakeIntervalID(newValue: number) {
    runSnakeIntervalID = newValue
  }

  public updateIsGameOver(newValue: boolean) {
    isGameOver = newValue
  }

  public updateSnakePositions(props: { newValueX: number; newValueY: number }) {
    snakePositionX = props.newValueX
    snakePositionY = props.newValueY
  }

  public updateUserPointCount(newValue: number) {
    userPointCount = newValue
  }

  public updateSnakeSpeedInMs(newValue: number) {
    snakeSpeedInMs = newValue
  }

  public updateMatriz(newValue: MatrizType) {
    matriz = newValue
  }

  public updateTouchStart(props: { newValueX: number; newValueY: number }) {
    touchStartX = props.newValueX
    touchStartY = props.newValueY
  }

  public updateColumnSize(newValue: number) {
    columnSize = newValue
  }

  public updateRowSize(newValue: number) {
    rowSize = newValue
  }
}
