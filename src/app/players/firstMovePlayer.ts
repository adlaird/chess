import { IPlayer } from './IPlayer';

export class FirstMovePlayer implements IPlayer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public chooseMove(moves: string[]) {
        return moves[0];
    }
}
