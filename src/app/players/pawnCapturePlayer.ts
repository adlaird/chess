import { IPlayer } from './IPlayer';

export class PawnCapturePlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Pawn Capture Player';
    }

    public chooseMove(moves: string[]) {
        let chosenMove = null;
        moves.forEach((move) => {
            if (move.indexOf('x') === 1) {
                if (move.charAt(0) === move.charAt(0).toLowerCase()) {
                    chosenMove = move;
                } else {
                    chosenMove = chosenMove || move;
                }
            }
        });

        return chosenMove || moves[Math.floor(Math.random() * moves.length)];
    }
}
