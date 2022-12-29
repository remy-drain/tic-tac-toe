(function() {
    let boardArr = Array(9).fill(null);
    // cache DOM
    const game = document.querySelector("#game");
    const cells = Array.from(game.querySelectorAll(".cell"));
    const players = game.querySelectorAll(".player");
    
    const gameBoard = {
        addMark: function(e) {
            let cell = Number(e.target.id);
            boardArr[cell] = game.classList.value;
            displayControl.showMark(e.target);
        },
        checkWin: function() {
            
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