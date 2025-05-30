const Gameboard = (function () {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const updateBoard = function (row, column, value) {
    board[row][column] = value;
    return board;
  };

  const getBoard = () => board;
  return { getBoard, updateBoard };
})();

function GameController(playerOneName, playerTwoName) {
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
}

function changeVal() {
  console.log(Gameboard.updateBoard(1, 1, 13));
}

changeVal();
