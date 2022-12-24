(function() {
    //cache DOM
    const page = document.querySelector("body");
    const players = page.querySelector("#players");
    const board = page.querySelector("#board");
    const cells = board.querySelectorAll(".cell");

    const gameBoard = {
       gameBoard: [],

       checkCell: function(e) {
        let selection = e.target;
        if (selection.classList.contains("x") || selection.classList.contains("oh")) {
            return;
        } else {
            gameBoard.addMark(selection);
        }
       },
       addMark: function(e) {
        const mark = {
            cell: e.getAttribute("data-cell"),
            player: board.getAttribute("class")
        }
        gameBoard.gameBoard.push(mark);
        displayControl.showMarks(e, mark.player);
       },
       checkForWin: function() {
        
       },
       switchPlayers: function() {

       }
    }

    const displayControl = {
        showMarks: function(cell, mark) {
            cell.classList.add(mark);
            gameBoard.checkForWin();
        }
    }

    //event listeners
    cells.forEach(cell => cell.addEventListener("click", gameBoard.checkCell));
})();