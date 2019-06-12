import { IPlayer } from './IPlayer';

export class RandomPlayer implements IPlayer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public chooseMove(moves: string[]) {
        return moves[Math.floor(Math.random() * moves.length)];
    }
}
