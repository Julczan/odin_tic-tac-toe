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
  // const winningCombinations = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];
  // for (let i = 0; i < winningCombinations.length; i++) {
  //   const [a, b, c] = winningCombinations[i];
  //   if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
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

  return { drawConditions };
}

function createPlayer(
  playerOneName = "Player one",
  playerTwoName = "Player Two"
) {
  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
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
