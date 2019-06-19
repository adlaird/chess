import { IPlayer } from './IPlayer';
import Chess from '../../../node_modules/chess.js';

export class AlwaysTakePlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Always Take Player';
    }

    public chooseMove(fen: string) {
        const moves = new Chess(fen).moves();
        let chosenMove = null;

        moves.forEach((move) => {
            if (move.indexOf('x') !== -1) {
                chosenMove = move;
            }
        });

        return chosenMove || moves[Math.floor(Math.random() * moves.length)];
    }
}
