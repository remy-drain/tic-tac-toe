(function() {
    //cache DOM
    const page = document.querySelector("body");
    const players = page.querySelector("#players");
    const board = page.querySelector("#board");
    const cells = board.querySelectorAll(".cell");

    const gameBoard = {
       gameBoard: [],

       addMark: function(e) {
        let cell = e.target.getAttribute("data-cell");
        let player = board.getAttribute("class");
        
        const mark = {
            cell: cell,
            player: player
        }
        gameBoard.gameBoard.push(mark);
        displayControl.showMark(cell, player);
       }
    }

    const displayControl = {
        showMark: function(cell, player) {
            
        }
    }

    //event listeners
    cells.forEach(cell => cell.addEventListener("click", gameBoard.addMark));
})();