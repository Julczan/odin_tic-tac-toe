const Gameboard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const dropToken = (row, column, player) => {
    const availableCells = board.map((row) => row.map((cell) => cell === 0));

    if (availableCells[row][column]) {
      board[row][column] = player;
    } else {
      return;
    }
  };

  const getBoard = () => board;

  return { getBoard, dropToken };
})();

function gameConditions(board) {
  const winningConditions = (board) => {
    const checking = [
      board[0][0] + board[1][0] + board[2][0],
      board[0][1] + board[1][1] + board[2][1],
      board[0][2] + board[1][2] + board[2][2],

      board[0][0] + board[0][1] + board[0][2],
      board[1][0] + board[1][1] + board[1][2],
      board[2][0] + board[2][1] + board[2][2],

      board[0][0] + board[1][1] + board[2][2],
      board[0][2] + board[1][1] + board[2][0],
    ];

    for (i = 0; i < checking.length; i++) {
      if (checking[i] === 3) {
        return "One";
      } else if (checking[i] === -3) {
        return "Two";
      }
    }
  };

  const drawConditions = (board) => {
    const checkRow1 = board[0].some((v) => v === 0);
    const checkRow2 = board[1].some((v) => v === 0);
    const checkRow3 = board[2].some((v) => v === 0);

    if (!checkRow1 && !checkRow2 && !checkRow3) {
      return true;
    } else {
      return false;
    }
  };

  return { drawConditions, winningConditions };
}

function createPlayer(
  playerOneName = "Player one",
  playerTwoName = "Player Two"
) {
  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: -1 },
  ];

  let activePlayer = players[0];

  const changePlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  return { getActivePlayer, changePlayerTurn };
}

function gameFlow() {
  const board = Gameboard;
  const players = createPlayer();
  const condition = gameConditions();

  const printNewRound = () => {
    console.log(board.getBoard());
    console.log(`${players.getActivePlayer().name}'s turn`);
  };

  const playRound = (column, row) => {
    board.dropToken(row, column, players.getActivePlayer().token);

    if (condition.winningConditions(board.getBoard()) === "One") {
      console.log("Player One Wins!");
    } else if (condition.winningConditions(board.getBoard()) === "Two") {
      console.log("Player Two Wins!");
    } else if (condition.drawConditions(board.getBoard())) {
      console.log("ITS A DRAW");
    } else {
      players.changePlayerTurn();
      printNewRound();
    }
  };

  printNewRound();

  return {
    playRound,
    getBoard: board.getBoard,
    getActivePlayer: players.getActivePlayer,
  };
}

function screenController() {
  const game = gameFlow();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;

        cellButton.textContent = cell;

        boardDiv.appendChild(cellButton);
      });
    });
  };

  function handleBoardClick(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (!selectedRow || !selectedColumn) return;

    game.playRound(selectedColumn, selectedRow);
    updateScreen();
  }

  boardDiv.addEventListener("click", handleBoardClick);

  updateScreen();
}

screenController();
