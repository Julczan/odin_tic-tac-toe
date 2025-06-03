const Gameboard = (function () {
  let board = [];

  const winningConditions = () => {
    const row1WinningCondition =
      board[0][0].getValue() === board[0][1].getValue() &&
      board[0][1].getValue() === board[0][2].getValue() &&
      board[0][1].getValue() !== 0;

    const row2WinningCondition =
      board[1][0].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[1][2].getValue() &&
      board[1][1].getValue() !== 0;

    const row3WinningCondition =
      board[2][0].getValue() === board[2][1].getValue() &&
      board[2][1].getValue() === board[2][2].getValue() &&
      board[2][1].getValue() !== 0;

    const column1WinningCondition =
      board[0][0].getValue() === board[1][0].getValue() &&
      board[1][0].getValue() === board[2][0].getValue() &&
      board[1][0].getValue() !== 0;

    const column2WinningCondition =
      board[0][1].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][1].getValue() &&
      board[0][1].getValue() !== 0;

    const column3WinningCondition =
      board[0][2].getValue() === board[1][2].getValue() &&
      board[1][2].getValue() === board[2][2].getValue() &&
      board[0][2].getValue() !== 0;

    const diagonalCondition =
      board[0][0].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][2].getValue() &&
      board[0][0].getValue() !== 0;

    const contrDiagonalCondition =
      board[2][0].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[0][2].getValue() &&
      board[2][0].getValue() !== 0;

    if (
      row1WinningCondition ||
      row2WinningCondition ||
      row3WinningCondition ||
      column1WinningCondition ||
      column2WinningCondition ||
      column3WinningCondition ||
      diagonalCondition ||
      contrDiagonalCondition
    ) {
      return true;
    } else {
      return false;
    }
  };

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }

  const dropToken = (row, column, player) => {
    const availableCells = board.map((row) =>
      row.map((cell) => cell.getValue() === 0)
    );
    if (availableCells[row][column]) {
      board[row][column].addToken(player);
    } else {
      return;
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );

    console.log(boardWithCellValues);
  };

  const getBoard = () => board;

  return { getBoard, dropToken, printBoard, winningConditions };
})();

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function gameFlow(playerOneName = "Player One", playerTwoName = "Player Two") {
  const board = Gameboard;

  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  const changePlayerTurn = function () {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (column, row) => {
    board.dropToken(row, column, getActivePlayer().token);

    if (board.winningConditions()) {
      console.log("WINNER!");
    } else {
      changePlayerTurn();
      printNewRound();
    }
  };

  printNewRound();

  return { playRound, getActivePlayer };
}

const game = gameFlow();
