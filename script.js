//get an active player token

const Gameboard = (function () {
  let board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }

  const dropToken = (row, column, player) => {
    board[row][column].addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  const getBoard = () => board;

  return { getBoard, dropToken, printBoard };
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
    board.getBoard();
  };

  const playRound = (row, column) => {
    board.dropToken();
  };

  return { playRound, printNewRound };
}

const game = gameFlow();
