import { IPlayer } from './IPlayer';
import Chess from '../../../node_modules/chess.js';
import { IChessJs } from '../IChessJs';
import _ from 'lodash';

export class CompetitionPlayer implements IPlayer {
    MAX_DEPTH = 3;
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
            console.log(checkmateMove);
            return checkmateMove;
        }

        const selectedMove = this.getBestMove(game) || this.getRandomMove(moves);
        console.log(selectedMove);

        const currentdate = new Date();
        console.log(currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds());

        return selectedMove;
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

        let evaluatedMoves = moves.map((move) => {
            return {
                move,
                pieceDiff: this.evaluateMoveWithDepth(move, game, 1)
            };
        });

        evaluatedMoves = evaluatedMoves.sort((a, b) => b.pieceDiff - a.pieceDiff);

        return evaluatedMoves[0].move;
    }

    private evaluateMoveWithDepth(move: string, game: IChessJs, depth: number): number {
        let pieceDiff = 0;

        if (move.indexOf('#') !== -1) {
            pieceDiff = 1000;
        } else if (move.indexOf('x') !== -1) {
            pieceDiff = this.getPieceValue(this.getCapturedPiece(move, game));
        }

        const clonedGame = new Chess(game.fen()) as IChessJs;
        clonedGame.move(move);

        if (depth === this.MAX_DEPTH || pieceDiff === 1000) {
            return pieceDiff;
        } else {
            const nextMoves = clonedGame.moves();
            const evaluatedMoves = nextMoves.map((nextMove) => {
                return this.evaluateMoveWithDepth(nextMove, clonedGame, depth + 1);
            });

            const opponentBestMoveDiff = evaluatedMoves.sort((a, b) => b - a)[0];

            return pieceDiff - opponentBestMoveDiff;
        }
    }

    private findKnownOpeningMove(game: IChessJs): string {
        const fen = game.fen();
        if (game.fen() === 'rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1') {
            // f4
            return 'd5';
        } else if (fen === 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1') {
            // e4
            return 'e5';
        } else if (fen === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
            // new game
            return 'e4';
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
