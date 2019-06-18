import { IPlayer } from './IPlayer';

export class AlwaysTakePlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Always Take Player';
    }

    public chooseMove(moves: string[]) {
        let chosenMove = null;
        moves.forEach((move) => {
            if (move.indexOf('x') !== -1) {
                chosenMove = move;
            }
        });

        return chosenMove || moves[Math.floor(Math.random() * moves.length)];
    }
}
