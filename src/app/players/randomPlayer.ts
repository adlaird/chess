import { IPlayer } from './IPlayer';
import Chess from '../../../node_modules/chess.js';

export class RandomPlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Random Player';
    }

    public chooseMove(fen: string) {
        const moves = new Chess(fen).moves();
        return moves[Math.floor(Math.random() * moves.length)];
    }
}
