type GameOverDisplayUIProps = {
  score: number
  speed: number
  bestScore: number
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
      `<span>Melhor Pontuação: ${props.bestScore}</span>` +
      '</div>' +
      '<button id="reset-game">Reiniciar</button>'
  }

  element.innerHTML = elementContent
}
