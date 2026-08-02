const bestScoreKey = 'best-score'
export function getBestScore() {
  return Number(window.localStorage.getItem(bestScoreKey))
}

export function setBestScore(value: number) {
  if (verifyScoreForSaved(value)) {
    window.localStorage.setItem(bestScoreKey, value.toString())
  }
}

function verifyScoreForSaved(score: number) {
  const oldScore = getBestScore()
  return oldScore < score
}
