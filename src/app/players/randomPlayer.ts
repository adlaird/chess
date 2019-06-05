interface Player {
    chooseMove: (moves: string[]) => string;
}

export class RandomPlayer implements Player {
    public chooseMove(moves: string[]) {
        return moves[Math.floor(Math.random() * moves.length)];
    }
}