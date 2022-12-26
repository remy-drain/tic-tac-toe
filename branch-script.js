(function() {
    //cache DOM
    const page = document.querySelector("body");
    const board = page.querySelector("#board");
    const cells = board.querySelectorAll(".cell");

    const winningArrays = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const gameBoard = {
       gameBoard: {
        x: [],
        oh: []
       },

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
        const cell = e.getAttribute("data-cell");
        this.gameBoard[board.getAttribute("class")].push(cell);
        this.gameBoard.checkForWin();
       },
       checkForWin: function() {
        if (this.gameBoard.length < 5) {
            this.switchPlayers();
        } else {
            let currentPlayer = board.getAttribute("class");
            winningArrays.forEach(arr => this.gameBoard[currentPlayer].includes(arr))
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