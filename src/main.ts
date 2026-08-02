import {
  touchStartHandler,
  touchEndHandler,
  keyDownHandler,
} from '@/modules/control-manager'
import { startGame } from './modules/control-display'
import '@/styles/index.css'

document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('touchstart', touchStartHandler)
document.addEventListener('touchend', touchEndHandler)
document.addEventListener('keydown', keyDownHandler)
