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
      },
      {
        fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        expectedMove: 'e5'
      },
      {
        fen: 'rnbqkbnr/ppppp1pp/8/5p2/4P3/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 2',
        expectedMove: 'exf5'
      },
      {
        fen: 'rnbqkbnr/ppp2ppp/8/3pP3/8/7P/PPP1PPP1/RNBQKBNR w KQkq - 0 4',
        expectedMove: 'Qxd5'
      },
      {
        fen: 'rn1qkbnr/ppp1pppp/3p4/5b2/7P/8/PPPPP1P1/RNBQKBNR b KQkq h3 0 3',
        expectedMove: 'Bxc2'
      },
      {
        fen: '1r2kb2/pp4pr/3p4/4p3/4n1B1/8/PP1P4/RNB1K1N1 b Q - 0 12',
        expectedMove: 'Nxd2'
      },
      {
        fen: '2r5/8/2p4k/1p6/P7/8/1R6/7K w - d6 0 2',
        expectedMove: 'axb5'
      },
      {
        fen: '4r2k/p3qR1p/1p5B/1PpQp1p1/2Pp4/3P3P/P7/6K1 w - - 0 43',
        expectedMove: 'Bg7+'
      },
      {
        fen: 'rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1',
        expectedMove: 'd5'
      },
      {
        fen: 'rn1qkbnr/ppQ2ppp/3p4/4p3/7P/8/PP1PP1P1/RNB1KBNR b KQkq - 0 5',
        expectedMove: 'Qxc7'
      },
      {
        fen: 'r3k3/pR4pr/8/4p3/6B1/P7/8/2B1KN2 b - - 0 20',
        expectedMove: 'g6'
      },
      {
        fen: '8/3k4/8/6pB/R7/P7/1B3K2/5N2 b - - 2 30',
        expectedMove: 'g4'
      },
      {
        fen: 'r1bqk2r/pppp1ppp/2n5/4P3/1bB1n3/2N2N2/PPP2PPP/R1BQK2R b KQkq - 1 6',
        expectedMove: 'Nxc3'
      },
      {
        fen: 'r1bq1k1r/p1pp2pp/1pn5/4P3/1b2Q3/2N2N2/PPP2PPP/R1B1K2R b KQ - 0 9',
        expectedMove: 'Bxc3+'
      },
      {
        fen: 'r2qk2r/pbpp2pp/1pn5/4P3/1b2QB2/2N2N2/PPP2PPP/R4RK1 b - - 3 11',
        expectedMove: 'Bxc3'
      },
      {
        fen: 'r2qkr2/p1pp2pp/bpQ5/4P3/1b3B2/2N2N2/PPP2PPP/R2R2K1 b - - 0 13',
        expectedMove: 'dxc6'
      },
      {
        fen: 'Q3k3/p1pq2pp/bp6/4P3/1b3r2/2N2N2/PPP2PPP/R5K1 b - - 0 15',
        expectedMove: 'Qc8'
      }
    ];

    this.player = new CompetitionPlayer();
  }

  public testMove(index: number): void {
    this.tests[index].actualMove = this.player.chooseMove(this.tests[index].fen);
  }
}
