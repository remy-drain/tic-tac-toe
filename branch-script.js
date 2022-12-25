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
            displayControl.showMarks(selection);
        }
       },
       addMark: function(e) {
        const mark = {
            [e.getAttribute("data-cell")]: board.getAttribute("class")
        }
        this.gameBoard.push(mark);
       },
       checkForWin: function() {
        if (this.gameBoard.length < 5) {
            this.switchPlayers();
        } else {
            this.gameBoard.filter();
        }
       },
       switchPlayers: function() {
        if (board.getAttribute("class") == "x") {
            board.classList.remove("x");
            board.classList.add("oh");
        } else {
            board.classList.remove("oh");
            board.classList.add("x");
        }

       }
    }

    const displayControl = {
        showMarks: function(cell) {
            let mark = board.getAttribute("class");
            cell.classList.add(mark);
            gameBoard.checkForWin();
        }
    }

    //event listeners
    cells.forEach(cell => cell.addEventListener("click", gameBoard.checkCell));
})();