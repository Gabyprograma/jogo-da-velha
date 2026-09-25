const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let player = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function play(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = player;
    cells[index].textContent = player;

    checkWinner();
}

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            status.textContent = `🎉 Jogador ${player} venceu!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        status.textContent = "🤝 Deu empate!";
        gameActive = false;
        return;
    }

    player = player === "X" ? "O" : "X";
    status.textContent = `Vez do jogador ${player}`;
}

function resetGame() {
    player = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
    });

    status.textContent = "Vez do jogador X";
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => play(index));
});

restart.addEventListener("click", resetGame);
