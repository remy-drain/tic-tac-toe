(function() {
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
    const players = game.querySelectorAll(".player");
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
            for (let arr of winningArrays) {
                const [a,b,c] = arr;
                if (boardArr[a] == game.classList.value && boardArr[b] == game.classList.value && boardArr[c] == game.classList.value) {
                    this.gameOver("win");
                }
            }
            if (boardArr.includes(null)) {
                this.switchPlayers();
            } else {
                this.gameOver("draw");
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
                let winner = game.classList.value.toUpperCase();
                endMessage = winner + " wins!";
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
        showMark: function(cell) {
            cell.classList.add(game.classList.value);
            gameBoard.checkWin();
        },
        clearMarks: function() {
            cells.forEach(cell => cell.className = 'cell');
        }
    }
    cells.forEach(cell => cell.addEventListener("click", gameBoard.addMark));

    playAgain.addEventListener("click", gameBoard.restart);
})();