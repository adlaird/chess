import { IPlayer } from './IPlayer';
import Chess from '../../../node_modules/chess.js';
import { IChessJs } from '../IChessJs';
import _ from 'lodash';

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
        const captureMoves: string[] = [];
        const nonCaptureMoves: string[] = [];
        let evaluatedMoves: any[] = [];

        moves.forEach((move) => {
            if (move.indexOf('x') !== -1) {
                captureMoves.push(move);
            } else {
                nonCaptureMoves.push(move);
            }
        });

        let evaluatedCaptureMoves = captureMoves.map((move) => {
            return {
                move,
                pieceDiff: this.evaluateMoveWithDepth(move, game, 1, 2)
            };
        });

        evaluatedCaptureMoves = evaluatedCaptureMoves.sort((a, b) => b.pieceDiff - a.pieceDiff);

        if (evaluatedCaptureMoves.length && evaluatedCaptureMoves[0].pieceDiff > 0) {
            evaluatedMoves = evaluatedCaptureMoves;
        } else {
            evaluatedMoves = nonCaptureMoves.map((move) => {
                return {
                    move,
                    pieceDiff: this.evaluateMoveWithDepth(move, game, 1, 2)
                };
            })
            .concat(evaluatedCaptureMoves)
            .sort((a, b) => b.pieceDiff - a.pieceDiff);
        }

        const topMove = evaluatedMoves[0];
        const tiedTopMoves = evaluatedMoves.filter((evaluatedMove) => {
            return evaluatedMove.pieceDiff === topMove.pieceDiff;
        }).map((filteredMove) => filteredMove.move);

        console.log('fen: ' + game.fen());
        console.log(tiedTopMoves)
        return this.chooseFromTopMoves(tiedTopMoves, game);
    }

    // public for testing
    public chooseFromTopMoves(moves: string[], game: IChessJs): string {
        const turn = game.turn();

        if (moves.length === 1) {
            return moves[0];
        } else if (this.hasPawnCenterControlMove(moves, turn)) {
            return this.hasPawnCenterControlMove(moves, turn);
        } else if (this.hasStrongKnightMove(moves, turn)) {
            return this.hasStrongKnightMove(moves, turn);
        } else if (this.hasBishopCenterControlMove(moves, turn)) {
            return this.hasBishopCenterControlMove(moves, turn);
        } else if (this.hasCastleMove(moves, turn)) {
            return this.hasCastleMove(moves, turn);
        }

        moves = this.removeWeakMoves(moves, turn);

        return this.getRandomMove(moves);
    }

    private hasCastleMove(moves: string[], turn: string) {
        if (moves.indexOf('O-O') !== -1) {
            return 'O-O';
        } else if (moves.indexOf('O-O-O') !== -1) {
            return 'O-O-O';
        }
    }

    private hasBishopCenterControlMove(moves: string[], turn: string) {
        if (turn === 'w') {
            if (moves.indexOf('Bc4') !== -1) {
                return 'Bc4';
            } else if (moves.indexOf('Bf4') !== -1) {
                return 'Bf4';
            }
        } else {
            if (moves.indexOf('Bc5') !== -1) {
                return 'Bc5';
            } else if (moves.indexOf('Bf5') !== -1) {
                return 'Bf5';
            }
        }
    }

    private removeWeakMoves(moves: string[], turn: string): string[] {
        if (moves.length === 1) {
            return moves;
        } else {
            moves = this.removeKnightEdgeMoves(moves);
            moves = this.removeKingMoves(moves);
            moves = this.removeOutsidePawnMoves(moves);
        }

        return moves;
    }

    private removeOutsidePawnMoves(moves: string[]): string[] {
        const newMoves = moves.filter((move) => {
            return !(move.startsWith('a') ||
                move.startsWith('b') ||
                move.startsWith('c') ||
                move.startsWith('f') ||
                move.startsWith('g') ||
                move.startsWith('h'));
        });

        return newMoves && newMoves.length ? newMoves : moves;
    }
    
    private removeKingMoves(moves: string[]): string[] {
        const newMoves = moves.filter((move) => !move.startsWith('K'));

        return newMoves && newMoves.length ? newMoves : moves;
    }

    private removeKnightEdgeMoves(moves: string[]): string[] {
        const newMoves = moves.filter((move) => {
            return !(move.startsWith('Na') ||
                move.startsWith('Nh') ||
                (move.startsWith('N') && (move.endsWith('1') || move.endsWith('8'))));
        });

        return newMoves && newMoves.length ? newMoves : moves;
    }

    private hasStrongKnightMove(moves: string[], turn: string) {
        if (turn === 'w') {
            if (moves.indexOf('Nf3') !== -1) {
                return 'Nf3';
            } else if (moves.indexOf('Nc3') !== -1) {
                return 'Nc3';
            }
        } else {
            if (moves.indexOf('Nc6') !== -1) {
                return 'Nc6';
            } else if (moves.indexOf('Nf6') !== -1) {
                return 'Nf6';
            }
        }
    }

    private hasPawnCenterControlMove(moves: string[], turn: string): string {
        if (turn === 'w') {
            if (moves.indexOf('e4') !== -1) {
                return 'e4';
            } else if (moves.indexOf('d4') !== -1) {
                return 'd4';
            }
        } else {
            if (moves.indexOf('e5') !== -1) {
                return 'e5';
            } else if (moves.indexOf('d5') !== -1) {
                return 'd5';
            }
        }
    }

    private evaluateMoveWithDepth(move: string, game: IChessJs, depth: number, maxDepth: number): number {
        let pieceDiff = 0;

        if (move.indexOf('#') !== -1) {
            pieceDiff = 1000;
        } else if (move.indexOf('x') !== -1) {
            pieceDiff = this.getPieceValue(this.getCapturedPiece(move, game));
        } else if (move.indexOf('=') !== -1) {
            pieceDiff = 8;
        }

        const clonedGame = new Chess(game.fen()) as IChessJs;
        clonedGame.move(move);

        if (depth === maxDepth || pieceDiff === 1000) {
            return pieceDiff;
        } else {
            const nextMoves = clonedGame.moves();
            const evaluatedMoves = nextMoves.map((nextMove) => {
                return this.evaluateMoveWithDepth(nextMove, clonedGame, depth + 1, maxDepth);
            });

            const opponentBestMoveDiff = evaluatedMoves.sort((a, b) => b - a)[0];

            return pieceDiff - opponentBestMoveDiff;
        }
    }

    private findKnownOpeningMove(game: IChessJs): string {
        const fen = game.fen();
        if (fen === 'rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1') {
            // f4
            return 'd5';
        } else if (fen === 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1' ||
                   fen === 'rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR b KQkq - 0 1') {
            // e4
            // e3
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
