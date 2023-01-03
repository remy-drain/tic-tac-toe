(function() {
    let playerArray = [];
    let boardArr = Array(9).fill(null);
    const winningArrays = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    // cache DOM
    const game = document.querySelector("#game");
    const cells = Array.from(game.querySelectorAll(".cell"));
    const playerNames = game.querySelector("#player-names");
    const playerX = playerNames.querySelector("#x-name");
    const playerO = playerNames.querySelector("#o-name");
    const players = game.querySelector("#players");
    const xName = players.querySelector(".x");
    const oName = players.querySelector(".o");
    const startGame = playerNames.querySelector("#start");
    const endGame = game.querySelector("#game-over");
    const msg = endGame.querySelector("#message");
    const playAgain = endGame.querySelector("#restart");

    const gameBoard = {
        addMark: function(e) {
            let cell = Number(e.target.id);

            if (boardArr[cell] !== null) {
                return;
            } else {
            boardArr[cell] = game.classList.value;
            displayControl.showMark(e.target);
            }
        },
        checkWin: function() {
            let isWinner = false;
            for (let arr of winningArrays) {
                const [a,b,c] = arr;
                if (boardArr[a] == game.classList.value && boardArr[b] == game.classList.value && boardArr[c] == game.classList.value) {
                    isWinner = true;
                }
            }
            if (isWinner) {
                this.gameOver("win");
            } else if (!boardArr.includes(null)) {
                this.gameOver("draw");
            } else {
                this.switchPlayers();
            }
        },
        switchPlayers: function() {
            if (game.classList.value == 'x') {
                game.classList.remove('x');
                game.classList.add('o');
            } else {
                game.classList.remove('o');
                game.classList.add('x');
            }
        },
        gameOver: function(e) {
            let endMessage;
            if (e == "win") {
                let winner = playerArray.find((obj) => {return obj.mark === game.classList.value});
                endMessage = winner.name + " wins!";
            } else if (e == "draw") {
                endMessage = "It's a tie!";
            }
            msg.textContent = endMessage;
            endGame.classList.add("show");
        },
        restart: function() {
            endGame.classList.remove("show");
            boardArr = Array(9).fill(null);
            displayControl.clearMarks();
            game.className = 'x';
        }
    }

    const displayControl = {
        showPlayers: function(x, o) {
            xName.append(`: ${x}`);
            oName.append(`: ${o}`);

            this.hidePlayerInput();
        },
        hidePlayerInput: function() {
            playerX.value = '';
            playerO.value = '';
            playerNames.classList.remove("show");
        },
        showMark: function(cell) {
            cell.classList.add(game.classList.value);
            gameBoard.checkWin();
        },
        clearMarks: function() {
            cells.forEach(cell => cell.className = 'cell');
        }
    }

    const playerControl = {
        getPlayers: function() {
            let x = {
                mark: "x",
                name: playerX.value
            };
            let o = {
                mark: "o",
                name: playerO.value
            };
            playerArray.push(x);
            playerArray.push(o);

            displayControl.showPlayers(x.name, o.name);
        }
    }
    startGame.addEventListener("click", playerControl.getPlayers);

    cells.forEach(cell => cell.addEventListener("click", gameBoard.addMark));

    playAgain.addEventListener("click", gameBoard.restart);
})();