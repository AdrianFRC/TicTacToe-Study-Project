import { GameState, Player } from "./type";

export const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

export function deriveGame(state: GameState) {
  const currentPlayer = players[state.moves.length % 2];

  const winningPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let winner = null;

  for (const player of players) {
    const selectedSquareIds = state.moves
      .filter((move) => move.player.id === player.id)
      .map((move) => move.squareId);
    for (const pattern of winningPatterns) {
      if (pattern.every((v) => selectedSquareIds.includes(v))) {
        winner = player;
      }
    }
  }

  return {
    moves: state.moves,
    currentPlayer,
    status: {
      isComplete: winner != null || state.moves.length === 9,
      winner,
    },
  };
}
export function deriveStats(state: GameState) {
  return {
    playerStats: players.map((player) => {
      const wins = state.history.currentRoundGames.filter(
        (game) => game.status.winner?.id === player.id
      ).length;

      return {
        ...player,
        wins,
      };
    }),
    ties: state.history.currentRoundGames.filter(
      (game) => game.status.winner === null
    ).length,
  };
}
