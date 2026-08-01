import {
  touchStartHandler,
  touchEndHandler,
  keyDownHandler,
} from '@/modules/control-manager'
import '@/style.css'
import { startGame } from './modules/control-display'

document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('touchstart', touchStartHandler)
document.addEventListener('touchend', touchEndHandler)
document.addEventListener('keydown', keyDownHandler)
