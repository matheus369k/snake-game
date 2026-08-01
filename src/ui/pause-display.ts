export function togglePauseDisplayUI(snakeDirection: string) {
  const element = document.getElementById('pause-display')
  if (!element) return

  let elementContent = ''
  if (snakeDirection === 'stop') {
    elementContent =
      '<h2>Pausado</h2>' +
      '<div class="pause-control">' +
      '<button id="reset-game">Reiniciar</button>' +
      '<button id="run-game">Continuar</button>' +
      '</div>'
  }

  element.innerHTML = elementContent
}
