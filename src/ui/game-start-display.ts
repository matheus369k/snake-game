export function gameStartDisplayUI(snakeDirection: string) {
  const element = document.getElementById('start-game-display')
  if (!element) return

  let elementContent = ''
  if (snakeDirection === 'start') {
    elementContent =
      '<h2>Começar o Jogo</h2>' + '<button id="run-game">Começar</button>'
  }

  element.innerHTML = elementContent
}
