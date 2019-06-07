import { Component } from '@angular/core';
import Chess from '../../node_modules/chess.js';
import { RandomPlayer } from './players/randomPlayer.js';
import { FirstMovePlayer } from './players/firstMovePlayer.js';
import { IPlayer } from './players/IPlayer';


// import * as stockfish from '../../node_modules/stockfish';


const WHITE: string = 'w',
    BLACK: string = 'b';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chessGame: any;
  fen: any;
  moves: any;
  legalMoves: any;
  // stockfish = new stockfish();
  turn: any;

  playerWhite: any;
  playerBlack: any;

  startGame(): void {
    this.playerWhite = new RandomPlayer();
    this.playerBlack = new FirstMovePlayer();

    this.chessGame = new Chess();

    this.legalMoves = this.chessGame.moves();
    this.turn = this.chessGame.turn();

    let moveCount = 0;

    while (!this.chessGame.game_over() && moveCount < 100) {
      const moves = this.chessGame.moves();
      let move;

      if (this.turn === WHITE) {
        move = this.playerWhite.chooseMove(moves)
      } else {
        move = this.playerBlack.chooseMove(moves);
      }
      
      this.moves += ' ' + move;
      this.chessGame.move(move);
      moveCount++;
      if(moveCount === 30) {
        debugger;
        this.fen = this.chessGame.fen();
      }
    }
debugger;
    var stockfish = new Worker('stockfish.js');
    
    stockfish.onmessage = function onmessage(event) {
      console.log(event.data);
    };

    stockfish.postMessage(`position fen ${this.fen}`);
    stockfish.postMessage('go depth 5');

    setTimeout(() => {
      stockfish.terminate();
    }, 10000)
    
  }
}
