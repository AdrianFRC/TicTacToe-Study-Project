import { useState } from "react";
import "./Menu.css";
import classNames from "classnames";

type Props = {
  onReset(): void;
  onNewRound(): void;
};

export default function Menu({ onReset, onNewRound }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="actions">
      <button
        className={classNames("menu-btn", menuOpen ? "border" : "")}
        onClick={() => setMenuOpen((preState) => !preState)}
      >
        Actions
        <i
          className={classNames(
            "fa-solid",
            menuOpen ? "fa-chevron-up" : "fa-chevron-down"
          )}
        ></i>
      </button>

      {menuOpen && (
        <div className="items border">
          <button onClick={onReset}>Reset</button>
          <button onClick={onNewRound}>New Round</button>
        </div>
      )}
    </div>
  );
}
