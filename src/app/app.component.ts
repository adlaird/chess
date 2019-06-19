import { Component, OnInit } from '@angular/core';
import Chess from '../../node_modules/chess.js';
import { RandomPlayer } from './players/randomPlayer.js';
import { FirstMovePlayer } from './players/firstMovePlayer.js';
import { IPlayer } from './players/IPlayer';
import { stringify } from '@angular/compiler/src/util';
import { AlwaysTakePlayer } from './players/alwaysTakePlayer.js';
import { PawnCapturePlayer } from './players/pawnCapturePlayer.js';
import { CheckmatePlayer } from './players/checkmatePlayer.js';
import { CheckmateOrTakePlayer } from './players/checkmateOrTakePlayer.js';


const WHITE = 'w';
const BLACK = 'b';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blackWins = 0;
  chessGame: any;
  draws = 0;
  fen: string;
  fens: string[] = [];
  gameCount = 0;
  gameResult: string;
  gameResults: number[] = [];
  moves: any;
  legalMoves: any;
  stockfish: any;
  turn: any;
  whiteWins = 0;

  playerWhite: IPlayer;
  playerBlack: IPlayer;

  ngOnInit(): void {
    this.stockfish = new Worker('stockfish.js');

    this.stockfish.onmessage = function onmessage(event) {
      const message: string = event.data;

      if (message.startsWith('info depth 15')) {
        const resultSpans = Array.from(document.getElementsByClassName('result'));

        for (const result of resultSpans) {
          if (result.innerHTML === '') {
            const parts = message.split(' ');

            if (parts[8] === 'mate') {
              const mateIn = parseInt(parts[9], 10);
              if (mateIn > 0) {
                result.innerHTML = `W in ${mateIn}`;
              } else {
                result.innerHTML = `B in ${mateIn}`;
              }
            } else {
              result.innerHTML = stringify(parseInt(parts[9], 10) / 100);
            }

            break;
          }
        }
      }
    };
  }

  compileResults(): void {
    const resultSpans = this.getResultSpans();

    this.gameResults = [];
    this.gameCount = 0;
    this.whiteWins = 0;
    this.blackWins = 0;
    this.draws = 0;

    for (const result of resultSpans) {
      if (result.innerHTML !== '') {
        if (result.innerHTML === 'BLACK') {
          this.blackWins++;
        } else if (result.innerHTML === 'WHITE') {
          this.whiteWins++;
        } else if (result.innerHTML === 'STALEMATE') {
          this.draws++;
        } else {
          if (parseFloat(result.innerHTML) > 0) {
            this.whiteWins++;
          } else {
            this.blackWins++;
          }
        }

        this.gameCount++;
      }
    }
  }

  generateArray(n: number) {
    return Array(n);
  }

  startGame(): void {
    this.gameCount++;
    this.playerWhite = new RandomPlayer();
    this.playerBlack = new CheckmateOrTakePlayer();

    this.chessGame = new Chess();

    let moveCount = 0;

    while (!this.chessGame.game_over() && moveCount < 300) {
      const moves = this.chessGame.moves();
      let move;

      if (this.chessGame.turn() === WHITE) {
        move = this.playerWhite.chooseMove(moves);
      } else {
        move = this.playerBlack.chooseMove(moves);
      }

      this.chessGame.move(move);
      moveCount++;
    }

    const fen = this.chessGame.fen();
    this.fens.push(fen);

    if (this.chessGame.in_checkmate()) {
      const resultSpans = this.getResultSpans();
      let emptySpan = null;

      for (const span of resultSpans) {
        if (span.innerHTML === '') {
          emptySpan = span;
          break;
        }
      }

      if (this.chessGame.turn() === WHITE) {
        this.blackWins++;
        emptySpan.innerHTML = 'BLACK';
      } else {
        this.whiteWins++;
        emptySpan.innerHTML = 'WHITE';
      }
    } else if (this.chessGame.in_stalemate()) {
      const resultSpans = this.getResultSpans();

      for (const span of resultSpans) {
        if (span.innerHTML === '') {
          span.innerHTML = 'STALEMATE';
          break;
        }
      }
    } else {
      this.stockfish.postMessage('ucinewgame');
      this.stockfish.postMessage(`position fen ${fen}`);
      this.stockfish.postMessage('go depth 20');
    }
  }

  private getResultSpans(): Element[] {
    return Array.from(document.getElementsByClassName('result'));
  }
}
