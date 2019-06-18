import { IPlayer } from './IPlayer';

export class FirstMovePlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'First Move Player';
    }

    public chooseMove(moves: string[]) {
        return moves[0];
    }
}
