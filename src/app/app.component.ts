import { Component, OnInit } from '@angular/core';
import Chess from '../../node_modules/chess.js';
import { RandomPlayer } from './players/randomPlayer.js';
import { FirstMovePlayer } from './players/firstMovePlayer.js';
import { IPlayer } from './players/IPlayer';
import { stringify } from '@angular/compiler/src/util';


const WHITE = 'w';
const BLACK = 'b';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  chessGame: any;
  fen: any;
  gameCount = 0;
  gameResult: string;
  gameResults: number[] = [];
  moves: any;
  legalMoves: any;
  stockfish: any;
  turn: any;

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
            result.innerHTML = stringify(parseInt(message.split(' ')[9], 10) / 100);
            break;
          }
        }
      }
    };
  }

  compileResults(): void {
    const resultSpans = this.getResultSpans();

    for (const result of resultSpans) {
      if (result.innerHTML !== '') {
        this.gameResults.push(parseFloat(result.innerHTML));
        this.gameCount++;
      }
    }
  }

  generateArray(n: number) {
    return Array(n);
  }

  startGame(): void {
    for (let x = 0; x < 10; x++) {
      this.playerWhite = new RandomPlayer('Random Player');
      this.playerBlack = new FirstMovePlayer('First Move Player');

      this.chessGame = new Chess();

      this.legalMoves = this.chessGame.moves();
      this.turn = this.chessGame.turn();

      let moveCount = 0;

      while (!this.chessGame.game_over() && moveCount < 100) {
        const moves = this.chessGame.moves();
        let move;

        if (this.turn === WHITE) {
          move = this.playerWhite.chooseMove(moves);
        } else {
          move = this.playerBlack.chooseMove(moves);
        }

        this.moves += ' ' + move;
        this.chessGame.move(move);
        moveCount++;
        if (moveCount === 30) {
          this.fen = this.chessGame.fen();
        }
      }

      this.stockfish.postMessage('ucinewgame');
      this.stockfish.postMessage(`position fen ${this.fen}`);
      this.stockfish.postMessage('go depth 15');
    }
  }

  private getResultSpans(): Element[] {
    return Array.from(document.getElementsByClassName('result'));
  }
}
