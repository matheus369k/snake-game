export function renderCountUI(count: number) {
  const element = document.getElementById('game-points')
  if (!element) return

  element.innerText = count.toString()
}

export function renderSpeedSneakUI(speed: number) {
  const element = document.getElementById('game-speed')
  if (!element) return

  element.innerText = `${Math.ceil(speed)}/ms`
}

export function togglePauseDisplayUI(sneakDirection: string) {
  const element = document.getElementById('pause-display')
  if (!element) return

  let elementContent = ''
  if (sneakDirection === 'stop') {
    elementContent =
      '<h1>Pausado</h1>' +
      '<div class="pause-control">' +
      '<button id="reset-game">Reiniciar</button>' +
      '<button id="run-game">Continuar</button>' +
      '</div>'
  }

  element.innerHTML = elementContent
}

type GameOverDisplayUIProps = {
  score: number
  speed: number
  isGameOver: boolean
}
export function gameOverDisplayUI(props: GameOverDisplayUIProps) {
  const element = document.getElementById('game-over-display')
  if (!element) return

  let elementContent = ''
  if (props.isGameOver) {
    elementContent =
      '<h1>Fim de Jogo</h1>' +
      '<div>' +
      `<span>Pontuação: ${props.score}</span>` +
      `<span>Velocidade(ms): ${Math.ceil(props.speed)}</span>` +
      '</div>' +
      '<button id="reset-game">Reiniciar</button>'
  }

  element.innerHTML = elementContent
}
