export type MatrizType = ('head' | string | 'tail' | 'void')[][]

type GenerateMatrizProps = {
  rowSize: number
  columnSize: number
}

export function generateMatriz(props: GenerateMatrizProps) {
  const { columnSize, rowSize } = props

  return Array.from({ length: columnSize }).map((_, positionY) =>
    Array.from({ length: rowSize }).map((_, positionX) => {
      const centerPositionY = columnSize / 2 - 1
      const centerPositionX = rowSize / 2 - 1

      const isHeadPosition =
        positionX === centerPositionX && positionY === centerPositionY
      if (isHeadPosition) {
        return 'head'
      }

      const isBodyPositionOne =
        positionX === centerPositionX && positionY === centerPositionY - 1
      if (isBodyPositionOne) {
        return 'body-1'
      }

      const isTailPosition =
        positionX === centerPositionX && positionY === centerPositionY - 2
      if (isTailPosition) {
        return 'tail'
      }

      return 'void'
    }),
  ) as MatrizType
}

type UpdateMatrizProps = {
  nextPositionX: number
  nextPositionY: number
  userPointCount: number
  matriz: MatrizType
}

export function updateMatriz(props: UpdateMatrizProps) {
  const { nextPositionX, nextPositionY, matriz, userPointCount } = props

  for (let positionY = 0; positionY < matriz.length; positionY++) {
    for (let positionX = 0; positionX < matriz[positionY].length; positionX++) {
      const element = matriz[positionY][positionX]

      if (positionY === nextPositionY && positionX === nextPositionX) {
        matriz[positionY][positionX] = 'head'
        continue
      }

      if (element === 'head') {
        matriz[positionY][positionX] = 'body-1'
        continue
      }

      const sneakBodyNumber = Number(element.split('-')[1]) + 1
      if (element.includes('body') && sneakBodyNumber <= userPointCount) {
        matriz[positionY][positionX] = `body-${sneakBodyNumber}` as any
        continue
      }

      if (element === `body-${userPointCount}`) {
        matriz[positionY][positionX] = 'tail'
        continue
      }

      if (element === 'tail' || element.includes('body')) {
        matriz[positionY][positionX] = 'void'
        continue
      }
    }
  }

  return matriz
}
