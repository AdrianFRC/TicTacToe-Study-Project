 

const app = {
    $: {
        menu: document.querySelector('.actions'),
        menuItems: document.querySelector('.items'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        squares: document.querySelectorAll('[data-id="square"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalText: document.querySelector('[data-id="modal-text"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
        player: document.querySelector('[data-id="player"]'),
        playerIcon: document.querySelector('[data-id="player-icon"]'),
        turn: document.querySelector('[data-id="turn"]'),
        roundCountP1Wins: 0,
        roundCountTies: 0,
        roundCountP2Wins: 0,
        p1Wins: document.querySelector('[data-id="p1-wins"]'),
        ties: document.querySelector('[data-id="ties"]'),
        p2Wins: document.querySelector('[data-id="p2-wins"]'),
    },

    state:{
       moves: []
    },

    getGameStatus(moves){
        const p1Moves = moves.filter((move) => move.playerId === 1).map(
            move => move.squareId
        );
        const p2Moves = moves.filter((move) => move.playerId === 2).map(
            move => move.squareId
        );
    
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

        winningPatterns.forEach((pattern) =>{
            const p1Wins = pattern.every((v)=> p1Moves.includes(v))
            const p2Wins = pattern.every((v)=> p2Moves.includes(v))

            if(p1Wins) winner = 1
            if(p2Wins) winner = 2
        })

        return{
            status: moves.length === 9 || winner != null 
                ? 'complete' : 'in-progress', 
            winner,
        }

    },

    init() {
        app.registerEventListeners();
    },

    registerEventListeners(){
        app.$.menu.addEventListener('click', (event) => {
            app.$.menuItems.classList.toggle('hidden');
        });

        app.$.modalBtn.addEventListener('click', event => {
            app.state.moves = [];
            app.$.squares.forEach(squares => squares.replaceChildren());
            app.$.modal.classList.add('hidden');
            app.$.player.textContent = "Player 1, you're up!";
            app.$.playerIcon.classList.replace("yellow", "turquoise");
            app.$.player.classList.replace("yellow", "turquoise");
            app.$.playerIcon.classList.replace("fa-o", "fa-x");
        });

        app.$.resetBtn.addEventListener('click', event => {
            app.state.moves = [];
            app.$.squares.forEach(squares => squares.replaceChildren());
            app.$.player.textContent = "Player 1, you're up!";
            app.$.playerIcon.classList.replace("yellow", "turquoise");
            app.$.player.classList.replace("yellow", "turquoise");
            app.$.playerIcon.classList.replace("fa-o", "fa-x");

        });

        app.$.newRoundBtn.addEventListener('click', event => {
            app.$.roundCountP1Wins = 0;
            app.$.roundCountTies = 0;
            app.$.roundCountP2Wins = 0;
            app.$.p1Wins.innerText = 0;
            app.$.ties.innerText = 0;
            app.$.p2Wins.innerText = 0;
            app.state.moves = [];
            app.$.squares.forEach(squares => squares.replaceChildren());
            app.$.player.textContent = "Player 1, you're up!";
            app.$.playerIcon.classList.replace("yellow", "turquoise");
            app.$.player.classList.replace("yellow", "turquoise");
            app.$.playerIcon.classList.replace("fa-o", "fa-x");
        });

        app.$.squares.forEach((square) => {
            square.addEventListener('click', event => {

                const hasMove = (squareId) => {
                    const existingMove = app.state.moves.find(
                        (move) => move.squareId === squareId
                    )
                    return existingMove !== undefined;
                };
                
                if(hasMove(+square.id)){
                    return;
                }

                const lastMove = app.state.moves.at(-1);
                const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
                const currentPlayer = app.state.moves.length === 0
                    ? 1
                    : getOppositePlayer(lastMove.playerId);

                const icon = document.createElement('i');
                
                if(currentPlayer === 1){
                    icon.classList.add("fa-solid", "fa-x", "turquoise");
                    app.$.player.textContent = "Player 2, you're up!";
                    app.$.playerIcon.classList.replace("fa-x", "fa-o");
                    app.$.player.classList.replace("turquoise", "yellow");
                    app.$.playerIcon.classList.replace("turquoise", "yellow"); 
                }else{
                    icon.classList.add("fa-solid", "fa-o", "yellow");
                    app.$.player.textContent = "Player 1, you're up!";
                    app.$.player.classList.replace("yellow", "turquoise");
                    app.$.playerIcon.classList.replace("fa-o", "fa-x");
                    app.$.playerIcon.classList.replace("yellow", "turquoise");
                };

                app.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer,
                });

                square.replaceChildren(icon);
                

                const game = app.getGameStatus(app.state.moves);

                if(game.status === 'complete'){
                    app.$.modal.classList.remove("hidden");
                    let message = '';
                    game.winner 
                        ? message = `Player ${game.winner} wins!`
                        : message = "It's a tie";   
                    app.$.modalText.textContent = message;
                    if(game.winner===1){
                        app.$.roundCountP1Wins++
                        app.$.p1Wins.textContent = app.$.roundCountP1Wins;
                    }else if(game.winner===2){
                        app.$.roundCountP2Wins++
                        app.$.p2Wins.textContent = app.$.roundCountP2Wins;
                    }else{
                        app.$.roundCountTies++
                        app.$.ties.textContent = app.$.roundCountTies;
                    }

                        
                }
                console.log(app.$.roundCount);
            });    
        });
    },
};


window.addEventListener('load', app.init); 