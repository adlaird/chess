import { IPlayer } from './IPlayer';

export class CheckmatePlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Checkmate Player';
    }

    public chooseMove(moves: string[]) {
        let chosenMove = null;
        moves.forEach((move) => {
            if (move.indexOf('#') !== -1) {
                chosenMove = move;
            }
        });

        return chosenMove || moves[Math.floor(Math.random() * moves.length)];
    }
}
