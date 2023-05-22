export default class View {
  $ = {};

  constructor() {
    this.$.menu = this.#qs(".actions");
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.player = this.#qs('[data-id="player"]');
    this.$.playerIcon = this.#qs('[data-id="player-icon"]');
    this.$.turn = this.#qs('[data-id="turn"]');
    this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
    this.$.ties = this.#qs('[data-id="ties"]');
    this.$.p2Wins = this.#qs('[data-id="p2-wins"]');

    this.$.squares = this.#qsAll('[data-id="square"]');

    this.$.menu.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  gameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  newRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  playerMoveEvent(handler) {
    this.$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  openMessage(message) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.innerText = message;
  }

  closeMessage() {
    this.$.modal.classList.add("hidden");
  }

  clearBoard() {
    this.$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  existingMoves(moves) {
    this.$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareId === +square.id);

      if (existingMove) {
        this.handlerPlayerMove(square, existingMove.player);
      }
    });
  }

  closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const menuIcon = this.$.menuBtn.querySelector("i");
    menuIcon.classList.add("fa-chevron-down");
    menuIcon.classList.remove("fa-chevron-up");
  }

  // helper methods
  updateScore(p1Wins, p2Wins, ties) {
    this.$.p1Wins.innerText = `${p1Wins} wins`;
    this.$.p2Wins.innerText = `${p2Wins} wins`;
    this.$.ties.innerText = `${ties} ties`;
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const menuIcon = this.$.menuBtn.querySelector("i");
    menuIcon.classList.toggle("fa-chevron-down");
    menuIcon.classList.toggle("fa-chevron-up");
  }

  handlerPlayerMove(square, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.colorClass, player.iconClass);
    square.replaceChildren(icon);
  }

  //player 1|2
  playerTurnInd(player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);
    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you're up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  #qs(selector) {
    const el = document.querySelector(selector);

    if (!el) {
      throw new Error("could not find elements");
    }
    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) {
      throw new Error("could not find elements");
    }
    return elList;
  }
}
