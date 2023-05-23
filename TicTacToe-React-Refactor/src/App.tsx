import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import { GameState, Player } from "./type";
import classNames from "classnames";
import { deriveGame, deriveStats, players } from "./Utilities";

export default function App() {
  const [state, setState] = useState<GameState>({
    moves: [],
    history: {
      currentRoundGames: [],
      allGames: [],
    },
  });

  const game = deriveGame(state);
  const stats = deriveStats(state);

  function resetGame(isNewRound: boolean) {
    setState((preState) => {
      const stateClone = structuredClone(preState);
      const { status, moves } = game;

      if (status.isComplete) {
        stateClone.history.currentRoundGames.push({
          moves,
          status,
        });
      }

      stateClone.moves = [];

      if (isNewRound) {
        stateClone.history.allGames.push(
          ...stateClone.history.currentRoundGames
        );
        stateClone.history.currentRoundGames = [];
      }

      return stateClone;
    });
  }

  function handlePlayerMove(squareId: number, player: Player) {
    setState((preState) => {
      const stateClone = structuredClone(preState);
      stateClone.moves.push({
        squareId,
        player,
      });

      return stateClone;
    });
  }

  return (
    <>
      <main>
        <div className="grid">
          <div className="turn">
            <div style={{ position: "relative", padding: "15px" }}>
              <TransitionGroup>
                <CSSTransition
                  key={game.currentPlayer.id}
                  timeout={1000}
                  classNames="icon"
                >
                  <i
                    className={classNames(
                      "fa-solid",
                      "turn-icon",
                      game.currentPlayer.colorClass,
                      game.currentPlayer.iconClass
                    )}
                  ></i>
                </CSSTransition>
              </TransitionGroup>
            </div>
            <div className={"turn-player-box"}>
              <TransitionGroup>
                <CSSTransition
                  key={game.currentPlayer.id}
                  timeout={1000}
                  classNames="player"
                >
                  <p
                    className={classNames(
                      "turn-player",
                      game.currentPlayer.colorClass
                    )}
                  >
                    {game.currentPlayer.name}, you're up!
                  </p>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>

          <Menu
            onReset={() => resetGame(false)}
            onNewRound={() => resetGame(true)}
          />

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
            const existingMove = game.moves.find(
              (move) => move.squareId === squareId
            );

            return (
              <div
                key={squareId}
                className="square shadow"
                onClick={() => {
                  if (existingMove) return;
                  /* changestate */
                  handlePlayerMove(squareId, game.currentPlayer);
                }}
              >
                {existingMove && (
                  <i
                    className={classNames(
                      "fa-solid",
                      "move-icon",
                      existingMove.player.colorClass,
                      existingMove.player.iconClass
                    )}
                  ></i>
                )}
              </div>
            );
          })}

          <div
            className="score shadow"
            style={{ backgroundColor: "var(--turquoise)" }}
          >
            <p>Player 1</p>
            <span>{stats.playerStats[0].wins} Wins</span>
          </div>
          <div
            className="score shadow"
            style={{ backgroundColor: "var(--light-gray)" }}
          >
            <p>Ties</p>
            <span>{stats.ties}</span>
          </div>
          <div
            className="score shadow"
            style={{ backgroundColor: "var(--yellow)" }}
          >
            <p>Player 2</p>
            <span>{stats.playerStats[1].wins} Wins</span>
          </div>
        </div>
      </main>

      <Footer />

      {game.status.isComplete && (
        <Modal
          message={
            game.status.winner
              ? `${game.status.winner.name} wins!`
              : `Its's a tie!`
          }
          onClick={() => resetGame(false)}
        />
      )}
    </>
  );
}
