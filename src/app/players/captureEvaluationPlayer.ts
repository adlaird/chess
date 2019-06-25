import { IPlayer } from './IPlayer';
import Chess from '../../../node_modules/chess.js';
import { IChessJs } from '../IChessJs';

export class CaptureEvaluationPlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Capture Evaluation Player';
    }

    public chooseMove(fen: string) {
        const game = new Chess(fen) as IChessJs;
        const moves = game.moves();

        const checkmateMove = this.getCheckmateMove(moves);

        if (checkmateMove) {
            return checkmateMove;
        }

        const captures = this.getCaptures(moves);

        if (captures.length) {
            return this.getBestCapture(game) || moves[Math.floor(Math.random() * moves.length)];
        }

        return moves[Math.floor(Math.random() * moves.length)];
    }

    private getBestCapture(game: IChessJs): string {
        const captures: string[] = [];

        game.moves().forEach((move) => {
            if (move.indexOf('x') !== -1) {
                captures.push(move);
            }
        });

        let captureEvalList = [];

        captures.forEach((capture) => {
            const capturingPiece = this.getCapturingPiece(capture);
            const capturedPiece = this.getCapturedPiece(capture, game);
            const pieceDifference = this.getPieceValue(capturingPiece) - this.getPieceValue(capturedPiece);
            captureEvalList.push({ capture, pieceDifference });
        });

        captureEvalList = captureEvalList.sort((a: any, b: any) => a.pieceDifference - b.pieceDifference);

        if (captureEvalList[0].pieceDifference <= 0) {
            return captureEvalList[0].capture;
        } else {
            return null;
        }
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

    private getCapturedPiece(capture: string, game: IChessJs): string {
        const splitCapture = capture.split('x');

        if (splitCapture.length !== 2) {
            return null;
        }

        const square = splitCapture[1].substr(0, 2);
        const piece = game.get(square);
        
        if (piece) {
            return piece.type;
        } else {
            // en-passant
            return 'p';
        }
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

    private getPieceValue(piece): number {
        if (piece === 'q') {
            return 9;
        } else if (piece === 'k') {
            return 2;
        } else if (piece === 'b') {
            return 3.01;
        } else if (piece === 'n') {
            return 3;
        } else if (piece === 'r') {
            return 5;
        } else {
            return 1;
        }
    }
}
