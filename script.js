// ==========================================
// TIC TAC TOE - COMPLETE JAVASCRIPT
// ==========================================


// Get all cells
const cells = document.querySelectorAll(".cell");

// Get text elements
const turnText = document.getElementById("turnText");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

// Get buttons
const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");


// ==========================================
// GAME VARIABLES
// ==========================================

let board = ["", "", "", "", "", "", "", "",];

let currentPlayer = "X";

let gameActive = true;

let xScore = 0;
let oScore = 0;


// ==========================================
// WINNING COMBINATIONS
// ==========================================

const winningCombinations = [

    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]

];


// ==========================================
// CELL CLICK
// ==========================================

function handleCellClick(event) {

    const cell = event.currentTarget;

    const index = Number(cell.dataset.index);


    // Don't allow clicking occupied cells
    if (board[index] !== "") {
        return;
    }


    // Don't allow clicking after game ends
    if (!gameActive) {
        return;
    }


    // Store player's move
    board[index] = currentPlayer;


    // Display player's symbol
    cell.textContent = currentPlayer;


    // Add correct CSS class
    if (currentPlayer === "X") {

        cell.classList.add("x");

    } else {

        cell.classList.add("o");

    }


    // Check game
    checkResult();
}


// ==========================================
// CHECK RESULT
// ==========================================

function checkResult() {

    let winningCombination = null;


    // Check all combinations
    for (const combination of winningCombinations) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            winningCombination = combination;

            break;
        }
    }


    // ======================================
    // WINNER
    // ======================================

    if (winningCombination !== null) {

        gameActive = false;


        // Highlight winning cells
        winningCombination.forEach(function(index) {

            cells[index].classList.add("winning-cell");

        });


        // Update score
        if (currentPlayer === "X") {

            xScore++;

            scoreX.textContent = xScore;

            turnText.textContent =
                "🎉 Player X Wins!";

        } else {

            oScore++;

            scoreO.textContent = oScore;

            turnText.textContent =
                "🎉 Player O Wins!";

        }


        return;
    }


    // ======================================
    // DRAW
    // ======================================

    if (!board.includes("")) {

        gameActive = false;

        turnText.textContent =
            "🤝 Game Draw!";

        return;
    }


    // ======================================
    // CHANGE PLAYER
    // ======================================

    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";


    turnText.textContent =
        "Player " + currentPlayer + "'s Turn";
}


// ==========================================
// RESTART CURRENT GAME
// ==========================================

function restartGame() {

    // Clear board
    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    // X starts again
    currentPlayer = "X";


    // Enable game
    gameActive = true;


    // Clear all cells
    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("x");

        cell.classList.remove("o");

        cell.classList.remove("winning-cell");

    });


    // Update message
    turnText.textContent =
        "Player X's Turn";
}


// ==========================================
// RESET SCORE
// ==========================================

function resetScore() {

    // Reset scores
    xScore = 0;
    oScore = 0;


    // Update display
    scoreX.textContent = "0";
    scoreO.textContent = "0";


    // Restart board
    restartGame();
}


// ==========================================
// CELL EVENTS
// ==========================================

cells.forEach(function(cell) {

    cell.addEventListener(
        "click",
        handleCellClick
    );

});


// ==========================================
// RESTART BUTTON
// ==========================================

restartBtn.addEventListener(
    "click",
    restartGame
);


// ==========================================
// RESET SCORE BUTTON
// ==========================================

resetScoreBtn.addEventListener(
    "click",
    resetScore
);
