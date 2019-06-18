import { IPlayer } from './IPlayer';

export class RandomPlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Random Player';
    }

    public chooseMove(moves: string[]) {
        return moves[Math.floor(Math.random() * moves.length)];
    }
}
