type loadFruitUIProps = {
  rowSize: number
  columnSize: number
}

export function loadFruitUI(props: loadFruitUIProps) {
  const fruitAppleElement = document.querySelector('[data-point=fruit-apple]')
  if (fruitAppleElement) return 0

  const randomElementID = `X-${Math.ceil(Math.random() * props.rowSize)}/Y-${Math.ceil(Math.random() * props.columnSize)}`
  const element = document.getElementById(randomElementID)

  const isNotEmptySpaceCurrentElement =
    !element?.classList.contains('empty-field')
  if (isNotEmptySpaceCurrentElement) return 0

  loadAppleUI(randomElementID)
  return 1
}

function loadAppleUI(elementId: string) {
  const element = document.getElementById(elementId)
  element?.setAttribute('data-point', 'fruit-apple')
}

export function resetFruitUI() {
  const fruitAppleElement = document.querySelector('[data-point=fruit-apple]')
  fruitAppleElement?.setAttribute('data-point', '')
}
