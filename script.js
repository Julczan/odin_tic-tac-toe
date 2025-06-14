const Gameboard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const resetGame = () => {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  };

  const dropToken = (row, column, player) => {
    const availableCells = board.map((row) => row.map((cell) => cell === 0));

    if (availableCells[row][column]) {
      board[row][column] = player;
    } else {
      return;
    }
  };

  const getBoard = () => board;

  return { getBoard, dropToken, resetGame };
})();

function gameConditions() {
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
      if (checking[i] === 3 || checking[i] === -3) {
        return true;
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

function setPlayerNames() {
  const firstName = document.querySelector("#name-1");
  const secondName = document.querySelector("#name-2");

  const getValues = () => [
    firstName.value === "" ? "Player One" : firstName.value,
    secondName.value === "" ? "Player Two" : secondName.value,
  ];

  return { getValues };
}

function createPlayer() {
  const names = setPlayerNames();

  const players = [
    { name: names.getValues()[0], token: 1 },
    { name: names.getValues()[1], token: -1 },
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
  const finish = gameOver();

  const playRound = (column, row) => {
    board.dropToken(row, column, players.getActivePlayer().token);

    if (condition.winningConditions(board.getBoard())) {
      finish.getDialog(players.getActivePlayer().name);
    } else if (condition.drawConditions(board.getBoard())) {
      finish.getDialog("draw");
    } else {
      players.changePlayerTurn();
    }
  };

  return {
    playRound,
    getBoard: board.getBoard,
    getActivePlayer: players.getActivePlayer,
    resetGame: board.resetGame,
  };
}

function gameOver() {
  const dialog = document.querySelector("dialog");
  const dialogText = document.querySelector(".text");

  const getDialog = (winner) => {
    if (winner === "draw") {
      dialogText.textContent = "Its a DRAW!";
    } else {
      dialogText.textContent = `${winner} WON!`;
    }
    dialog.showModal();
  };

  return { getDialog };
}

function screenController() {
  const game = gameFlow();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const resetBtn = document.querySelector("#reset");

  resetBtn.addEventListener("click", () => {
    game.resetGame();
    updateScreen();
  });

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
        switch (cell) {
          case 0:
            cellButton.textContent = "";
            break;
          case 1:
            cellButton.textContent = "X";
            break;
          default:
            cellButton.textContent = "O";
            break;
        }
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

const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", () => screenController());
