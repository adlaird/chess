import { CompetitionPlayer } from './competitionPlayer';
import Chess from '../../../node_modules/chess.js';

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

  it('should meet d4 with d5 on the first move as black', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1');
    expect(move).toBe('d5');
  });

  it('should develop knight after king pawn opening', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2');
    expect(move).toBe('Nf3');
  });

  it('should develop protect pawn with knight after Nf3', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');
    expect(move).toBe('Nc3');
  });

  describe('top move selection', () => {
    it('does not move the king', () => {
      const player = new CompetitionPlayer();
      const move = player.chooseFromTopMoves(['Ke7', 'Bc8'], new Chess('Q3k3/p1pq2pp/bp6/4P3/1b3r2/2N2N2/PPP2PPP/R5K1 b - - 0 15'));
      expect(move).toBe('Bc8');
    });
  });
});
