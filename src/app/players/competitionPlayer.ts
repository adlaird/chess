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
        } else if (this.hasDevelopmentMove(moves, game)) {
            return this.hasDevelopmentMove(moves, game);
        } else if (this.hasCastleMove(moves, turn)) {
            return this.hasCastleMove(moves, turn);
        }

        moves = this.removeWeakMoves(moves, turn);

        return this.getRandomMove(moves);
    }
   
    private hasDevelopmentMove(moves: string[], game: IChessJs): string {
        const undevelopedSquares = this.findUndevelopedPieceSquares(game);

        if (undevelopedSquares) {
            if (game.turn() === 'w') {
                if (undevelopedSquares.indexOf('b1') !== -1) {
                    if (moves.indexOf('Nc3') !== -1) {
                        return 'Nc3'
                    } else if (moves.indexOf('Nd2') !== -1) {
                        return 'Nd2';
                    }
                }
                
                if (undevelopedSquares.indexOf('g1') !== -1) {
                    if (moves.indexOf('Nf3') !== -1) {
                        return 'Nf3'
                    } else if (moves.indexOf('Ne2') !== -1) {
                        return 'Ne2';
                    }
                }
                
                if (undevelopedSquares.indexOf('f1') !== -1) {
                    if (moves.indexOf('Bb5') !== -1) {
                        return 'Bb5'
                    } else if (moves.indexOf('Bc4') !== -1) {
                        return 'Bc4';
                    } else if (moves.indexOf('Bg2') !== -1) {
                        return 'Bg2';
                    } else if (moves.indexOf('Bd3') !== -1) {
                        return 'Bd3';
                    } else if (moves.indexOf('Be2') !== -1) {
                        return 'Be2';
                    } else if (moves.indexOf('e3') !== -1) {
                        return 'e3';
                    } else if (moves.indexOf('g3') !== -1) {
                        return 'g3';
                    }
                }

                if (undevelopedSquares.indexOf('c1') !== -1) {
                    if (moves.indexOf('Bf5') !== -1) {
                        return 'Bf5'
                    } else if (moves.indexOf('Be4') !== -1) {
                        return 'Be4';
                    } else if (moves.indexOf('Bb2') !== -1) {
                        return 'Bb2';
                    } else if (moves.indexOf('Be3') !== -1) {
                        return 'Be3';
                    } else if (moves.indexOf('Bd2') !== -1) {
                        return 'Bd2';
                    } else if (moves.indexOf('d3') !== -1) {
                        return 'd3';
                    } else if (moves.indexOf('b3') !== -1) {
                        return 'b3';
                    }
                }
                
                if (undevelopedSquares.indexOf('d1') !== -1) {
                    return moves.find((move) => {
                        return move.indexOf('Q') === 1;
                    });
                }
            } else {
                if (undevelopedSquares.indexOf('b8') !== -1) {
                    if (moves.indexOf('Nc6') !== -1) {
                        return 'Nc6'
                    } else if (moves.indexOf('Nd7') !== -1) {
                        return 'Nd7';
                    }
                }
                
                if (undevelopedSquares.indexOf('g8') !== -1) {
                    if (moves.indexOf('Nf6') !== -1) {
                        return 'Nf6'
                    } else if (moves.indexOf('Ne7') !== -1) {
                        return 'Ne7';
                    }
                }
                
                if (undevelopedSquares.indexOf('f8') !== -1) {
                    if (moves.indexOf('Bb4') !== -1) {
                        return 'Bb4'
                    } else if (moves.indexOf('Bc5') !== -1) {
                        return 'Bc5';
                    } else if (moves.indexOf('Bg7') !== -1) {
                        return 'Bg7';
                    } else if (moves.indexOf('Bd6') !== -1) {
                        return 'Bd6';
                    } else if (moves.indexOf('Be7') !== -1) {
                        return 'Be7';
                    } else if (moves.indexOf('e6') !== -1) {
                        return 'e6';
                    } else if (moves.indexOf('g6') !== -1) {
                        return 'g6';
                    }
                }
                
                if (undevelopedSquares.indexOf('c8') !== -1) {
                    if (moves.indexOf('Bf4') !== -1) {
                        return 'Bf4'
                    } else if (moves.indexOf('Be5') !== -1) {
                        return 'Be5';
                    } else if (moves.indexOf('Bb7') !== -1) {
                        return 'Bb7';
                    } else if (moves.indexOf('Be6') !== -1) {
                        return 'Be6';
                    } else if (moves.indexOf('Bd7') !== -1) {
                        return 'Bd7';
                    } else if (moves.indexOf('d6') !== -1) {
                        return 'd6';
                    } else if (moves.indexOf('b6') !== -1) {
                        return 'b6';
                    }
                }
                
                if (undevelopedSquares.indexOf('d8') !== -1) {
                    return moves.find((move) => {
                        return move.indexOf('Q') === 1;
                    });
                }
            }
        }

        return null;
    }

    private findUndevelopedPieceSquares(game: IChessJs): string[] {
        const undevelopedSquares: string[] = [];
        let knightSquares: string[] = [],
            bishopSquares: string[] = [],
            queenSquares: string[] = [];
        
        if (game.turn() === 'w') {
            knightSquares = ['b1', 'g1'];
            bishopSquares = ['c1', 'f1'];
            queenSquares = ['d1'];
        } else {
            knightSquares = ['b8', 'g8'];
            bishopSquares = ['c8', 'f8'];
            queenSquares = ['d8'];
        }

        knightSquares.forEach((square) => {
            const piece = game.get(square);

            if (piece && piece.color === game.turn() && piece.type === game.KNIGHT) {
                undevelopedSquares.push(square);
            }
        });

        bishopSquares.forEach((square) => {
            const piece = game.get(square);

            if (piece && piece.color === game.turn() && piece.type === game.BISHOP) {
                undevelopedSquares.push(square);
            }
        });

        queenSquares.forEach((square) => {
            const piece = game.get(square);

            if (piece && piece.color === game.turn() && piece.type === game.QUEEN) {
                undevelopedSquares.push(square);
            }
        });

        return undevelopedSquares;
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

    private evaluateMoveWithDepth(move: string, game: IChessJs, depth: number): number {
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
        } else if (fen === 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1' && game.turn() !== 'w') {
            // d4
            return 'd5';
        } else if (fen === 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2' && game.turn() === 'w') {
            return 'Nf3';
        } else if (fen === 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2' && game.turn() !== 'w') {
            return 'Nc6';
        }
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
