import { Component } from '@angular/core';
import Chess from '../../node_modules/chess.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chessGame: any;
  moves: any;
  legalMoves: any;

  startGame(): void {
    alert('start game');
    this.chessGame = new Chess();

    this.legalMoves = this.chessGame.moves();

    // while (!this.chessGame.game_over()) {
    //   var moves = this.chessGame.moves();
    //   var move = moves[Math.floor(Math.random() * moves.length)];
    //   this.chessGame.move(move);
    // }
  }
}
