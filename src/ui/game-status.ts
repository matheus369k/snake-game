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

export function renderBestScoreSnakeUI(score: number) {
  const element = document.getElementById('game-best-score')
  if (!element) return

  element.innerText = score.toString()
}
