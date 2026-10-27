const cells = [...document.querySelectorAll(".cell")];
const statusEl = document.querySelector("#status");
const modeSelect = document.querySelector("#mode");
const xScoreEl = document.querySelector("#x-score");
const oScoreEl = document.querySelector("#o-score");
const scoreX = document.querySelector("#score-x");
const scoreO = document.querySelector("#score-o");
const oLabel = document.querySelector("#o-label");
const restartBtn = document.querySelector("#restart");
const resetScoresBtn = document.querySelector("#reset-scores");

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;
let scores = { X: 0, O: 0 };

function getWinningLine(state = board) {
  return winningLines.find(line => line.every(index => state[index] && state[index] === state[line[0]]));
}

function setStatus(message) {
  statusEl.textContent = message;
}

function updateTurnUI() {
  scoreX.classList.toggle("active", !gameOver && currentPlayer === "X");
  scoreO.classList.toggle("active", !gameOver && currentPlayer === "O");
  cells.forEach((cell, index) => {
    cell.disabled = gameOver || Boolean(board[index]) || (modeSelect.value === "computer" && currentPlayer === "O");
  });
}

function render() {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.classList.toggle("mark-x", board[index] === "X");
    cell.classList.toggle("mark-o", board[index] === "O");
    cell.classList.remove("winner");
    cell.setAttribute("aria-label", `Cell ${index + 1}${board[index] ? `, ${board[index]}` : ", empty"}`);
  });
  xScoreEl.textContent = scores.X;
  oScoreEl.textContent = scores.O;
  oLabel.textContent = modeSelect.value === "computer" ? "COMPUTER" : "PLAYER O";
  const line = getWinningLine();
  if (line) line.forEach(index => cells[index].classList.add("winner"));
  updateTurnUI();
}

function finishRound(winner) {
  gameOver = true;
  if (winner) {
    scores[winner]++;
    setStatus(modeSelect.value === "computer" && winner === "O" ? "Computer wins this round!" : `Player ${winner} wins! 🎉`);
  } else {
    setStatus("It's a draw! Great game.");
  }
  render();
}

function playMove(index) {
  if (gameOver || board[index]) return;
  board[index] = currentPlayer;
  const line = getWinningLine();
  if (line) {
    render();
    finishRound(currentPlayer);
    return;
  }
  if (board.every(Boolean)) {
    render();
    finishRound(null);
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  setStatus(modeSelect.value === "computer" && currentPlayer === "O" ? "Computer is thinking…" : `Player ${currentPlayer}'s turn`);
  render();
}

function computerMove() {
  if (gameOver || currentPlayer !== "O" || modeSelect.value !== "computer") return;
  const move = findBestMove();
  if (move !== -1) playMove(move);
}

// Minimax makes the computer unbeatable, while preferring faster wins.
function findBestMove() {
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < board.length; i++) {
    if (board[i]) continue;
    board[i] = "O";
    const score = minimax(board, 0, false);
    board[i] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  return bestMove;
}

function minimax(state, depth, isMaximizing) {
  const line = getWinningLine(state);
  if (line) return state[line[0]] === "O" ? 10 - depth : depth - 10;
  if (state.every(Boolean)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < state.length; i++) {
      if (state[i]) continue;
      state[i] = "O";
      best = Math.max(best, minimax(state, depth + 1, false));
      state[i] = "";
    }
    return best;
  }
  let best = Infinity;
  for (let i = 0; i < state.length; i++) {
    if (state[i]) continue;
    state[i] = "X";
    best = Math.min(best, minimax(state, depth + 1, true));
    state[i] = "";
  }
  return best;
}

function newRound() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  setStatus("Your turn — make a move!");
  render();
}

cells.forEach(cell => cell.addEventListener("click", () => {
  const index = Number(cell.dataset.index);
  if (modeSelect.value === "computer" && currentPlayer === "O") return;
  playMove(index);
  if (!gameOver && modeSelect.value === "computer" && currentPlayer === "O") {
    window.setTimeout(computerMove, 350);
  }
}));

modeSelect.addEventListener("change", newRound);
restartBtn.addEventListener("click", newRound);
resetScoresBtn.addEventListener("click", () => {
  scores = { X: 0, O: 0 };
  newRound();
});

render();
