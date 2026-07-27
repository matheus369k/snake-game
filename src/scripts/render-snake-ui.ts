import type { MatrizType } from './screen-matriz'

const bgScreenXadrezColors = ['color-one', 'color-two']
export function loadSnakeUI<T>(matriz: MatrizType, direction: T) {
  for (let PositionX = 0; PositionX < matriz.length; PositionX++) {
    bgScreenXadrezColors.reverse()

    for (let PositionY = 0; PositionY < matriz[PositionX].length; PositionY++) {
      const currentElementID = `X-${PositionX}/Y-${PositionY}`
      const value = matriz[PositionX][PositionY]
      bgScreenXadrezColors.reverse()

      const loadEmptyElement = document.getElementById(currentElementID)
      const isNotEmptySpaceCurrentElement =
        !loadEmptyElement?.classList.contains('empty-field')
      if (isNotEmptySpaceCurrentElement) {
        loadEmptySpaceUI(currentElementID)
      }

      if (value === 'head') {
        loadSnakeHeadUI<T>(currentElementID, direction)
        continue
      }

      if (value.includes('body')) {
        loadSnakeBodyUI(currentElementID)
        continue
      }

      if (value === 'tail') {
        loadSnakeTailUI<T>(currentElementID, direction)
        continue
      }
    }
  }
}

function loadSnakeHeadUI<T>(elementId: string, direction: T) {
  let rotate = '0deg'
  if (direction === 'top') rotate = '180deg'
  if (direction === 'right') rotate = '270deg'
  if (direction === 'bottom') rotate = '0deg'
  if (direction === 'left') rotate = '90deg'

  const element = document.getElementById(elementId)
  if (!element) return

  element.setAttribute('class', 'snake-head')
  element.setAttribute('data-point', '')
  element.style.rotate = rotate
}

function loadSnakeBodyUI(elementId: string) {
  const element = document.getElementById(elementId)
  if (!element) return

  element.setAttribute('class', 'snake-body')
  element.style.rotate = ''
}

function loadSnakeTailUI<T>(elementId: string, direction: T) {
  let rotate = '0deg'
  if (direction === 'top') rotate = '180deg'
  if (direction === 'right') rotate = '270deg'
  if (direction === 'bottom') rotate = '0deg'
  if (direction === 'left') rotate = '90deg'

  const element = document.getElementById(elementId)
  if (!element) return

  element.setAttribute('class', 'snake-tail')
  element.style.rotate = rotate
}

function loadEmptySpaceUI(elementId: string) {
  const oldElement = document.getElementById(elementId)
  if (oldElement) {
    oldElement.setAttribute('class', 'empty-field')
    oldElement.style.rotate = ''
    return
  }

  const emptyFieldElement = document.createElement('div')
  emptyFieldElement.setAttribute('class', 'empty-field')
  emptyFieldElement.setAttribute('id', elementId)
  emptyFieldElement.setAttribute('data-bg-colors', bgScreenXadrezColors[0])

  const fatherElement = document.getElementById('screen')
  fatherElement?.appendChild(emptyFieldElement)
}
