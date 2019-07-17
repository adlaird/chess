import { CompetitionPlayer } from './competitionPlayer';

describe('CompetitionPlayer', () => {
  it('should exist', () => {
      const player = new CompetitionPlayer();
      expect(player).not.toBeNull();
  });

  it('should play checkmate when available', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('4r1k1/p4RBp/1p4p1/1PpQp3/2Pp3q/3P3P/P7/6K1 w - - 10 44');
    expect(move).toBe('Re7#');
  });

  it('should play e4 on first move as white', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    expect(move).toBe('e4');
  });

  it('should meet e4 with e5 on first move as black', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1');
    expect(move).toBe('e5');
  });

  
  it('should not move the knight', () => {
    debugger;
    const player = new CompetitionPlayer();
    const move = player.chooseMove('r1b1k1nr/pppp1ppp/2n2q2/1Bb5/3pP3/8/PPP2PPP/RNBQK1NR b KQkq - 3 6');
    expect(move).not.toBe('Nb4');
  });

  it('should meet f4 with d5', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1');
    expect(move).toBe('d5');
  });

  // describe('chooseFromTopMoves', () => {
  //   it('should play a developing move', () => {
  //     const player = new CompetitionPlayer();
  //     const moves = 
  //     player.chooseFromTopMoves()
  //   })
  // });
});
