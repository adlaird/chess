import { IPlayer } from './IPlayer';
import Chess from '../../../node_modules/chess.js';

export class CaptureEvaluationPlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Capture Evaluation Player';
    }

    public chooseMove(fen: string) {
        const game = new Chess(fen);
        const moves = game.moves();

        const checkmateMove = this.getCheckmateMove(moves);

        if (checkmateMove) {
            return checkmateMove;
        }

        const captures = this.getCaptures(moves);

        if (captures.length) {
            return this.getBestCapture(moves);
        }

        return moves[Math.floor(Math.random() * moves.length)];
    }

    private getBestCapture(game): string {
        const captures: string[] = [];

        game.moves().forEach((move) => {
            if (move.indexOf('x') !== -1) {
                captures.push(move);
            }
        });

        captures.forEach((capture) => {
            // get capturing piece
            const capturingPiece = this.getCapturingPiece(capture);
            // get captured piece
            // get value difference between
            // add to array
        });

        // sort array by value difference. grab the best

        return captures[0];
    }

    private getCaptures(moves: string[]): string[] {
        const captures: string[] = [];

        moves.forEach((move) => {
            if (move.indexOf('x') !== -1) {
                captures.push(move);
            }
        });

        return captures;
    }

    private getCapturingPiece(capture: string): string {
        const splitCapture = capture.split('x');

        if (splitCapture.length !== 2) {
            return null;
        }

        const leftSide = splitCapture[0];

        if (['K', 'Q', 'R', 'B', 'N'].indexOf(leftSide) !== -1) {
            return leftSide.toLowerCase();
        } else {
            return 'p';
        }
    }

    private getCheckmateMove(moves: string[]): string {
        let checkmateMove = null;

        moves.forEach((move) => {
            if (move.indexOf('#') !== -1) {
                checkmateMove = move;
            }
        });

        return checkmateMove;
    }
}
