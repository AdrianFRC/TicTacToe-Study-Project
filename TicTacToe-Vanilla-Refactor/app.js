import View from "./views.js";
import Store from "./store.js";

const players = [
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

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  function initView() {
    view.clearBoard();
    view.closeMessage();
    view.playerTurnInd(store.game.currentPlayer);
    view.updateScore(
      store.stats.playerStats[0].wins,
      store.stats.playerStats[1].wins,
      store.stats.ties
    );
    view.existingMoves(store.game.moves);
  }

  window.addEventListener("storage", () => {
    initView();
  });

  initView();

  view.gameResetEvent(() => {
    store.reset();
    initView();
  });

  view.newRoundEvent(() => {
    store.newRound();
    store.reset();
    initView();
  });

  view.playerMoveEvent((square) => {
    view.closeMenu();
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    view.handlerPlayerMove(square, store.game.currentPlayer);

    store.playerMove(+square.id);

    if (store.game.status.isComplete) {
      view.openMessage(
        store.game.status.winner
          ? `${store.game.status.winner.name} wins!`
          : `It's a tie`
      );
      return;
    }

    view.playerTurnInd(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);
