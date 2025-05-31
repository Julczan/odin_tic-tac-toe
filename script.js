const Players = (function (
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
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

  const getPlayerToken = () => players.map((player) => player.token);

  return { getPlayerToken };
})();

//get an active player token

function gameFlow() {
  let activePlayer = players[0];

  const changeActivePlayer = function () {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
}

const Gameboard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let val;
  val = Players.getPlayerToken()[0];
  let row = 2;
  let column = 2;

  board[row][column] = val;

  const getBoard = () => board;

  return { getBoard };
})();

console.log(Gameboard.getBoard());
