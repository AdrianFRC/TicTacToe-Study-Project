export type Player = {
  id: number;
  name: string;
  iconClass: string;
  colorClass: string;
};

export type Game = {
  moves: Move[];
  status: GameStatus;
};

export type Move = {
  squareId: number;
  player: Player;
};

export type GameState = {
  moves: Move[];
  history: {
    currentRoundGames: Game[];
    allGames: Game[];
  };
};

export type GameStatus = {
  isComplete: boolean;
  winner: Player | null;
};
