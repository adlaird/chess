import { CompetitionPlayer } from './competitionPlayer';

describe('CompetitionPlayer', () => {
  it('should exist', () => {
      const player = new CompetitionPlayer();
      expect(player).not.toBeNull();
  });

  it('should play exd5 or e5', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2');
    expect(['exd5', 'e5'].indexOf(move)).not.toBe(-1);
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

  it('should take free pawns', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/ppppp1pp/8/5p2/4P3/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 2');
    expect(move).toBe('exf5');
  });

  it('should not take defended pieces', () => {
    const player = new CompetitionPlayer();

    let move = player.chooseMove('rnbqkbnr/ppp2ppp/8/3pP3/8/7P/PPP1PPP1/RNBQKBNR w KQkq - 0 4');
    expect(move).not.toBe('Qxd5');

    move = player.chooseMove('rn1qkbnr/ppp1pppp/3p4/5b2/7P/8/PPPPP1P1/RNBQKBNR b KQkq h3 0 3');
    expect(move).not.toBe('Bxc2');

    move = player.chooseMove('1r2kb2/pp4pr/3p4/4p3/4n1B1/8/PP1P4/RNB1K1N1 b Q - 0 12');
    expect(move).not.toBe('Nxd2');
  });

  it('should take under-defended pieces', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('2r5/8/2p4k/1p6/P7/8/1R6/7K w - d6 0 2');
    expect(move).toBe('axb5');
  });

  it('should find mate in 2', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('4r2k/p3qR1p/1p5B/1PpQp1p1/2Pp4/3P3P/P7/6K1 w - - 0 43');
    expect(move).toBe('Bg7+');
  });

  it('should meet f4 with d5', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1');
    expect(move).toBe('d5');
  });

  it('should take the higher valued piece', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('rn1qkbnr/ppQ2ppp/3p4/4p3/7P/8/PP1PP1P1/RNB1KBNR b KQkq - 0 5');
    expect(move).toBe('Qxc7');
  });

  it('should not discover attacks for opponent', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('r3k3/pR4pr/8/4p3/6B1/P7/8/2B1KN2 b - - 0 20');
    expect(move).not.toBe('g6');
  });

  it('should not move into attacked, undefended squares', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('8/3k4/8/6pB/R7/P7/1B3K2/5N2 b - - 2 30');
    expect(move).not.toBe('g4');
  });

  // for testing recursion
  xit('calculates with a simple position', () => {
    const player = new CompetitionPlayer();
    const move = player.chooseMove('k7/8/8/pp6/8/PP6/K7/8 b - - 1 2');
    expect(move).toBe('aaaa');
  });
});
