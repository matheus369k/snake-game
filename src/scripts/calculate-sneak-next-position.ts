type RunningSneakPosition<T> = {
  sneakDirection: T
  positionY: number
  positionX: number
  columnSize: number
  rowSize: number
}

export function calculateSneakNextPosition<T>(props: RunningSneakPosition<T>) {
  const { sneakDirection, positionY, positionX, columnSize, rowSize } = props
  switch (sneakDirection) {
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
