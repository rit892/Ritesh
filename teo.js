let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const overlay = document.getElementById("overlay");
const overlayMessage = document.getElementById("overlay-message");

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(event) {
    if (gameOver) return;

    const index = event.target.getAttribute("data-index");

    if (gameBoard[index] !== "") return;  // Cell already filled

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        overlayMessage.textContent = `Player ${currentPlayer} Wins!`;
        overlay.style.display = "flex";
        gameOver = true;
    } else if (gameBoard.every(cell => cell !== "")) {
        overlayMessage.textContent = "It's a Tie!";
        overlay.style.display = "flex";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    currentPlayer = "X";
    overlay.style.display = "none";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}
