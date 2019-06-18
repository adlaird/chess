import { IPlayer } from './IPlayer';

export class CheckmateOrTakePlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Checkmate Or Take Player';
    }

    public chooseMove(moves: string[]) {
        let chosenMove = null;
        moves.forEach((move) => {
            if (move.indexOf('#') !== -1) {
                chosenMove = move;
            } else if (move.indexOf('x') !== -1) {
                chosenMove = chosenMove || move;
            }
        });

        return chosenMove || moves[Math.floor(Math.random() * moves.length)];
    }
}
