(function() {
    //cache DOM
    const page = document.querySelector("body");
    const playersInput = page.querySelectorAll("input");
    const letsPlay = page.querySelector("button#play");
    const playerNames = page.querySelector("#player-names");
    const playerXMark = playerNames.querySelector("h1.player-x");
    const playerXName = playerNames.querySelector("h2.player-x");
    const playerOhMark = playerNames.querySelector("h1.player-oh");
    const playerOhName = playerNames.querySelector("h2.player-oh");
    const board = page.querySelector("#board");
    const cells = board.querySelectorAll(".cell");

    //modules
    const gameBoard = {
        marks: [],

        hideNode: function(node) {
            node.classList.remove("show");
        },
        showPlayers: function(player) {
            playerNames.classList.add("show");
            if (player.mark === "player-x") {
                playerXName.textContent = player.name;
            } else {
                playerOhName.textContent = player.name;
            }
        },
        addMark: function(cell, mark) {
            cell.classList.add(mark);
        },
        switchPlayers: function() {
            playerXMark.classList.toggle("turn");
            playerOhMark.classList.toggle("turn");
        },
        gameOver: function(result) {
            console.log(result);
        }
    }

    const players = {
        players: [],
        getPlayers: function(e) {
            e.preventDefault();
            playersInput.forEach(player => players.addPlayers(player, player.value));
        },
        addPlayers: function(mark, name) {
            const player = {
                name: name,
                mark: mark.getAttribute("id")
            }
            players.players.push(player);
            gameBoard.hideNode(mark.parentNode.parentNode);
            players.players.forEach(player => gameBoard.showPlayers(player));
        },
        switchPlayer: function(mark) {
            board.classList.remove(mark);
            if (mark === "x") {
                board.classList.add("oh");
            } else {
                board.classList.add("x");
            }
            gameBoard.switchPlayers();
        }
    }
    
    const game = {
        board: [],
        winningArrays: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        getMark: function(e) {
            const selection = e.target;
            if (selection.classList.contains("x") || selection.classList.contains("oh")) {
                return;
            }
            let cell = {
                dataCell: selection.getAttribute("data-cell"),
                playerMark: board.getAttribute("class")
            }
            gameBoard.addMark(selection, cell.playerMark);
            game.board.push(cell);
            game.checkGameStatus(cell.playerMark);
        },
        checkGameStatus: function(mark) {
            if (game.board.length < 5) {
                players.switchPlayer(mark);
            } else {
                game.checkForWin(mark);
            }
        },
        checkForWin: function(lastPlayed) {
            let playerArray = game.board.filter(mark => mark.playerMark === lastPlayed);
            let marks = [];
            console.log(lastPlayed);

            playerArray.forEach(play => marks.push(play.dataCell));

            for (let arr of game.winningArrays) {
                if (arr.every(val => marks.includes(val.toString()))) {
                    gameBoard.gameOver(lastPlayed);
                } else if (game.board.length === 9) {
                    gameBoard.gameOver("draw");
                } else {players.switchPlayer(lastPlayed);}
            }
        }
    }
        //bind events
        letsPlay.addEventListener("click", players.getPlayers);
        cells.forEach(cell => cell.addEventListener("click", game.getMark));
})();
// ------------------------------------------------------
//     
//     function checkForWin(e) {
//         const markArray = board[e];
//         const boardArray = board.x.concat(board.oh);
//         for (let arr of winningArrays) {
//             if (arr.every(val => markArray.includes(val.toString()))) {
//                 declareWinner(e);
//             } else if (boardArray.length === 9) {
//                 gameDraw();
//             } else {
//                 switchPlayer();
//             }
//         }
//     }

//     function declareWinner(e) {
//         console.log(e);
//     }

//     function switchPlayer() {
//         
//         }
//     }
// })();

