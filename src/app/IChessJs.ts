export interface IChessJs {
    WHITE: string;
    BLACK: string;
    PAWN: string;
    KNIGHT: string;
    BISHOP: string;
    ROOK: string;
    QUEEN: string;
    KING: string;
    SQUARES: () => any[];
    FLAGS: string;

    load: () => void;

    reset: () => void;

    moves: () => string[];

    in_check: () => boolean;

    in_checkmate: () => boolean;

    in_stalemate: () => boolean

    in_draw: () => boolean;

    insufficient_material: () => boolean;

    in_threefold_repetition: () => boolean;

    game_over: () => boolean;

    validate_fen: () => any;

    fen: () => string;

    pgn: () => string;

    load_pgn: () => void;

    header: () => void;

    ascii: () => any;

    turn: () => string;

    move: () => any;

    undo: () => any;

    clear: () => void;

    put: () => any;

    get: (square: string) => any;

    remove: () => any;

    perft: () => any;

    square_color: () => string;

    history: () => any;
}