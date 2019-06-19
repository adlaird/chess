import { IPlayer } from './IPlayer';
import Chess from '../../../node_modules/chess.js';

export class FirstMovePlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'First Move Player';
    }

    public chooseMove(fen: string) {
        const moves = new Chess(fen).moves();
        return moves[0];
    }
}
