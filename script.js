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
    letsPlay.addEventListener("click", getPlayers);
    cells.forEach((cell) => cell.addEventListener("click", addMark));

    function getPlayers(e) {
        e.preventDefault();
        playersInput.forEach((player) => addPlayers(player, player.value));
    }

    function addPlayers(e, value) {
        const player = {
            name: value,
            mark: e.getAttribute("id")
        }
        players.push(player);
        hideNode(e.parentNode.parentNode);
    }

    function hideNode(node) {
        node.classList.remove("show");
    }

    function addMark(e) {
        const selection = e.target;
        if (selection.classList.contains("x") || selection.classList.contains("oh")) {
            return;
        }
        let cell = {
            dataCell: selection.getAttribute("data-cell"),
            playerMark: gameBoard.getAttribute("class")
        }
        board.push(cell);
        selection.classList.add(cell.playerMark);
        switchPlayer();
    }

    function switchPlayer() {
        if (gameBoard.getAttribute("class") === "x") {
            gameBoard.setAttribute("class", "oh");
        } else {
            gameBoard.setAttribute("class", "x");
        }
    }
})();
