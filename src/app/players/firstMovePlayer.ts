import { IPlayer } from './IPlayer';

export class FirstMovePlayer implements IPlayer {
    public chooseMove(moves: string[]) {
        return moves[0];
    }
}