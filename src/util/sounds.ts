export class GameSounds {
  private readonly baseSoundPath = "./sounds/";
  private gameOverSound = new Audio();
  private gameTurnSideSound = new Audio();
  private gameMusicSound = new Audio();
  private gameScoreSound = new Audio();
  isMuted = false;

  private findFilePath(fileName: string) {
    return this.baseSoundPath.concat(fileName);
  }

  private resetSoundState(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    audio.load();
  }

  toggleMutedInAllSounds() {
    const sounds = [
      this.gameTurnSideSound,
      this.gameMusicSound,
      this.gameScoreSound,
      this.gameOverSound,
    ];
    const isMuted = sounds.every(({ muted }) => muted);

    sounds.forEach((sound) => {
      sound.muted = !isMuted;
    });

    this.isMuted = !isMuted;
  }

  playTurnSideSound() {
    this.gameTurnSideSound.src = this.findFilePath("arcade-turn-side.wav");
    this.resetSoundState(this.gameTurnSideSound);
    this.gameTurnSideSound.play();
  }

  playGameOverSound() {
    this.gameOverSound.src = this.findFilePath("arcade-game-over.wav");
    this.resetSoundState(this.gameOverSound);
    this.gameOverSound.play();
  }

  playGameMusicSound() {
    this.gameMusicSound.pause();
    this.gameMusicSound.loop = true;
    this.gameMusicSound.src = this.findFilePath("arcade-music.mp3");
    this.resetSoundState(this.gameMusicSound);
    this.gameMusicSound.play();
  }

  playScoreSound(isNewHighScore: boolean) {
    this.gameScoreSound.src = this.findFilePath("arcade-point-scored.wav");
    if (isNewHighScore) {
      this.gameScoreSound.src = this.findFilePath("arcade-high-score.wav");
    }

    this.resetSoundState(this.gameScoreSound);
    this.gameScoreSound.play();
  }
}
