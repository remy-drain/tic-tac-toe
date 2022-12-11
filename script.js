const game = (function() {
    const players = [];
    const board = [];

    //cache DOM
    const page = document.querySelector("body");
    const playersInput = page.querySelectorAll("input");
    const letsPlay = page.querySelector("button#play");
    const gameBoard = page.querySelector("#board");
    const cells = gameBoard.querySelectorAll(".cell");

    //bind events
    cells.forEach((cell) => cell.addEventListener("click", addMark));

    function addMark(e) {
        let cell = {
            dataCell: e.target.getAttribute("data-cell"),
            playerMark: gameBoard.getAttribute("class")
        }
        board.push(cell);
        console.log(board);
    }
})();
