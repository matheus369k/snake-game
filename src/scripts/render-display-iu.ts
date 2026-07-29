export function renderCountUI(count: number) {
  const element = document.getElementById('game-points')
  if (!element) return

  element.innerText = count.toString()
}

export function renderSpeedSnakeUI(speed: number) {
  const element = document.getElementById('game-speed')
  if (!element) return

  element.innerText = `${Math.ceil(speed)}/ms`
}

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
      '<h2>Fim de Jogo</h2>' +
      '<div>' +
      `<span>Pontuação: ${props.score}</span>` +
      `<span>Velocidade(ms): ${Math.ceil(props.speed)}</span>` +
      '</div>' +
      '<button id="reset-game">Reiniciar</button>'
  }

  element.innerHTML = elementContent
}

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
