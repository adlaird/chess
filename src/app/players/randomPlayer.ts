import { IPlayer } from './IPlayer';

export class RandomPlayer implements IPlayer {
    public chooseMove(moves: string[]) {
        return moves[Math.floor(Math.random() * moves.length)];
    }
}