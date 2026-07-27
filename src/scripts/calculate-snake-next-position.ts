type RunningSnakePosition<T> = {
  snakeDirection: T
  positionY: number
  positionX: number
  columnSize: number
  rowSize: number
}

export function calculateSnakeNextPosition<T>(props: RunningSnakePosition<T>) {
  const { snakeDirection, positionY, positionX, columnSize, rowSize } = props
  switch (snakeDirection) {
    case 'top':
      if (positionY === 0) {
        return {
          positionY: columnSize - 1,
          positionX,
        }
      }

      return {
        positionY: positionY - 1,
        positionX,
      }
    case 'bottom':
      if (positionY === columnSize - 1) {
        return {
          positionY: 0,
          positionX,
        }
      }

      return {
        positionY: positionY + 1,
        positionX,
      }
    case 'right':
      if (positionX === rowSize - 1) {
        return {
          positionX: 0,
          positionY,
        }
      }

      return {
        positionX: positionX + 1,
        positionY,
      }
    case 'left':
      if (positionX === 0) {
        return {
          positionX: rowSize - 1,
          positionY,
        }
      }

      return {
        positionX: positionX - 1,
        positionY,
      }
    default:
      return {
        positionY,
        positionX,
      }
  }
}
