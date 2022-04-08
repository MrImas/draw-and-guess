import { io } from '../index.js';
import { LEVELS_POINTS } from '../utils/constants.js';
import { generateWordByLevel } from '../utils/generateWord.js';
import { scoreModel } from '../models/Score.model.js';

export class Game {
  playerIdTurnToGuess;
  playerIdTurnToDraw;
  userNameToDraw;
  userNameToGuess;
  wordToGuess;
  levelPoints;
  startTimeGuessing;
  durationGuessing;
  room;
  constructor(room, playerIdTurnToDraw, userNameToDraw) {
    this.room = room;
    this.playerIdTurnToDraw = playerIdTurnToDraw;
    this.userNameToDraw = userNameToDraw;
  }

  startGame(playerIdTurnToGuess, userNameToGuess) {
    this.playerIdTurnToGuess = playerIdTurnToGuess;
    this.userNameToGuess = userNameToGuess;
    io.to(this.playerIdTurnToDraw).emit('start_game', {
      yourTurn: true,
      opponentName: this.userNameToGuess,
    });
    io.to(this.playerIdTurnToGuess).emit('start_game', {
      yourTurn: false,
      opponentName: this.userNameToDraw,
    });
  }

  chosenLevel(level) {
    this.wordToGuess = generateWordByLevel(level);
    this.levelPoints = LEVELS_POINTS[level];
    io.to(this.playerIdTurnToDraw).emit('word_to_draw', {
      word: this.wordToGuess,
    });
  }

  finishedDrawing(canvasData) {
    io.to(this.playerIdTurnToGuess).emit('start_guessing', {
      canvasData,
    });
    this.startTimeGuessing = Date.now();
  }

  async guess(guessedWord) {
    if (guessedWord.toLowerCase() === this.wordToGuess) {
      this.durationGuessing = (Date.now() - this.startTimeGuessing) / 1000;
      const score = await scoreModel.findOne({
        socketId: this.playerIdTurnToGuess,
      });
      if (score) {
        score.score += this.levelPoints;
        score.timeGuessingInSeconds += this.durationGuessing;
        await score.save();
      } else {
        await scoreModel.create({
          userName: this.userNameToGuess,
          socketId: this.playerIdTurnToGuess,
          score: this.levelPoints,
          timeGuessingInSeconds: this.durationGuessing,
        });
      }
      io.to(this.playerIdTurnToGuess).emit('earned_points', {
        points: this.levelPoints,
      });
      io.to(this.room).emit('finished_game');
      this.resetGame();
    }
  }

  resetGame() {
    const playerIdTurnToDrawTemp = this.playerIdTurnToDraw;
    this.playerIdTurnToDraw = this.playerIdTurnToGuess;
    this.playerIdTurnToGuess = playerIdTurnToDrawTemp;
    this.wordToGuess = '';
    this.startTimeGuessing = 0;
    this.durationGuessing = 0;
    const userNameToDrawTemp = this.userNameToDraw;
    this.userNameToDraw = this.userNameToGuess;
    this.userNameToGuess = userNameToDrawTemp;
  }
}
