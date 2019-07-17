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
});
