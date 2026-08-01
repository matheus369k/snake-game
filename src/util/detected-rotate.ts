export function detectedRotate(direction: string) {
  switch (direction) {
    case 'top':
      return '180deg'

    case 'right':
      return '270deg'

    case 'bottom':
      return '0deg'

    case 'left':
      return '90deg'
    default:
      return '0deg'
  }
}
