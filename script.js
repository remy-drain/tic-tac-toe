const game = (function() {
    const players = [];
    const board = {
        x: [],
        oh: []
    };
    const winningArrays = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //cache DOM
    const page = document.querySelector("body");
    const playersInput = page.querySelectorAll("input");
    const letsPlay = page.querySelector("button#play");
    const playerNames = page.querySelector("#player-names");
    const playerXMark = playerNames.querySelector("h1.player-x");
    const playerXName = playerNames.querySelector("h2.player-x");
    const playerOhMark = playerNames.querySelector("h1.player-oh");
    const playerOhName = playerNames.querySelector("h2.player-oh");
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
            mark: e.getAttribute("id"),
            board: []
        }
        players.push(player);
        hideNode(e.parentNode.parentNode);
        showPlayers();
    }

    function showPlayers() {
        playerNames.classList.add("show");
        players.forEach((player) => {
        if (player.mark === "player-x") {
            playerXName.textContent = player.name;
        } else {
            playerOhName.textContent = player.name;
        }
    })
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
        if (cell.playerMark === "x") {
            board.x.push(cell.dataCell);
        } else {
            board.oh.push(cell.dataCell);
        }
        console.log(board);
        selection.classList.add(cell.playerMark);
        checkForWin(cell.playerMark);
        switchPlayer();
    }

    function checkForWin(e) {
        const markArray = board[e];
        for (let arr of winningArrays) {
            if (arr.every((val) => markArray.includes(val))) {
                console.log("winner");
            } else {
                console.log("still reading fine");
            }
        }
        // compare to winning arrays
    }

    function switchPlayer() {
        if (gameBoard.getAttribute("class") === "x") {
            gameBoard.setAttribute("class", "oh");
            playerXMark.classList.remove("turn");
            playerOhMark.classList.add("turn");
        } else {
            gameBoard.setAttribute("class", "x");
            playerOhMark.classList.remove("turn");
            playerXMark.classList.add("turn");
        }
    }
})();

