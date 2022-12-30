(function() {
    let boardArr = Array(9).fill('open');
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

    const gameBoard = {
        addMark: function(e) {
            let cell = Number(e.target.id);

            if (boardArr[cell] !== 'open') {
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
                    this.gameOver();
                }
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
        gameOver: function() {
            console.log(game.classList.value + " wins!")
        }
    }

    const displayControl = {
        showMark: function(cell) {
            cell.classList.add(game.classList.value);
            gameBoard.checkWin();
        }
    }
    cells.forEach(cell => cell.addEventListener("click", gameBoard.addMark));
})();