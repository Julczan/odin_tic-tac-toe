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
        console.log("Player One wins!");
      } else if (checking[i] === -3) {
        console.log("Player Two wins!");
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

    condition.winningConditions(board.getBoard());

    if (condition.drawConditions(board.getBoard())) {
      console.log("ITS A DRAW");
    }

    players.changePlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound };
}

const game = gameFlow();
