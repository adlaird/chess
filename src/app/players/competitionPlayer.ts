import { IPlayer } from './IPlayer';
import Chess from '../../../node_modules/chess.js';
import { IChessJs } from '../IChessJs';

export class CompetitionPlayer implements IPlayer {
    name: string;

    constructor() {
        this.name = 'Competition Player';
    }

    public chooseMove(fen: string) {
        const game = new Chess(fen) as IChessJs;
        const moves = game.moves();

        const checkmateMove = moves.find((move) => {
            return move.indexOf('#') !== -1;
        });

        if (checkmateMove) {
            return checkmateMove;
        }

        return this.getBestMove(game) || this.getRandomMove(moves);
    }

    private getBestMove(game: IChessJs): string {
        const knownOpeningMove = this.findKnownOpeningMove(game);

        if (knownOpeningMove) {
            return knownOpeningMove;
        }

        return this.getBestMoveWithDepth(game);
    }
    
    private getBestMoveWithDepth(game: IChessJs): string {
        const moves = game.moves();
    }

    private findKnownOpeningMove(game: IChessJs): string {
        const fen = game.fen();
        if (game.fen() === 'rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1') {
            // f4
            return 'd5';
        } else if (fen === 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1') {
            // e4
            return 'e5';
        }
    }

    private getBestCapture(game: IChessJs): string {
        const captures = this.getCaptures(game.moves());

        if (captures && captures.length) {
            let evaluatedCaptures = captures.map((capture) => {
                return {
                    move: capture,
                    difference: this.calculateDifference(capture, game)
                };
            });

            evaluatedCaptures = evaluatedCaptures.sort((a, b) => a.difference - b.difference);

            return evaluatedCaptures[0].move;
        } else {
            return null;
        }
    }

    private calculateDifference(capture: string, game: IChessJs): number {
        const capturingPiece = this.getCapturingPiece(capture);
        const capturedPiece = this.getCapturedPiece(capture, game);
        const pieceDifference = this.getPieceValue(capturingPiece) - this.getPieceValue(capturedPiece);
        return pieceDifference;
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

    private getPieceValue(piece: string): number {
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

    private getRandomMove(moves: string[]): string {
        return moves[Math.floor(Math.random() * moves.length)];
    }
}
