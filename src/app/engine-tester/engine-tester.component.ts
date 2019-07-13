import { Component, OnInit } from '@angular/core';
import { CompetitionPlayer } from '../players/competitionPlayer';
import { IPlayer } from '../players/IPlayer';

interface ITest {
  fen: string,
  expectedMove: string,
  actualMove?: string
}

@Component({
  selector: 'app-engine-tester',
  templateUrl: './engine-tester.component.html',
  styleUrls: ['./engine-tester.component.scss']
})
export class EngineTesterComponent implements OnInit {
  tests: ITest[];
  player: IPlayer;

  constructor() { }

  ngOnInit() {
    this.tests = [
      {
        fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2',
        expectedMove: 'e5'
      },
      {
        fen: '4r1k1/p4RBp/1p4p1/1PpQp3/2Pp3q/3P3P/P7/6K1 w - - 10 44',
        expectedMove: 'Re7#'
      },
      {
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        expectedMove: 'e4'
      }
    ];

    this.player = new CompetitionPlayer();
  }

  public testMove(index: number): void {
    this.tests[index].actualMove = this.player.chooseMove(this.tests[index].fen);
  }

}
