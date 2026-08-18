// ==========================================
// TIC TAC TOE - CORRECTED SCRIPT.JS
// ==========================================


// Get all 9 cells
const cells = document.querySelectorAll(".cell");

// Get display elements
const turnText = document.getElementById("turnText");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

// Get buttons
const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");


// ==========================================
// GAME DATA
// ==========================================

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

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
// HANDLE CELL CLICK
// ==========================================

function handleCellClick(event) {

    // Get the actual clicked cell
    const cell = event.currentTarget;

    // Get its index
    const index = parseInt(cell.dataset.index, 10);


    // Safety check
    if (isNaN(index)) {
        return;
    }


    // Safety check for valid index
    if (index < 0 || index > 8) {
        return;
    }


    // Don't allow move if game is over
    if (!gameActive) {
        return;
    }


    // Don't allow already occupied cell
    if (board[index] !== "") {
        return;
    }


    // Store move
    board[index] = currentPlayer;


    // Display move
    cell.textContent = currentPlayer;


    // Add correct class
    if (currentPlayer === "X") {

        cell.classList.add("x");

    } else {

        cell.classList.add("o");

    }


    // Check result
    checkResult();
}


// ==========================================
// CHECK RESULT
// ==========================================

function checkResult() {

    let winningCombination = null;


    // Check every winning combination
    for (let i = 0; i < winningCombinations.length; i++) {

        const combination = winningCombinations[i];

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
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
        for (let i = 0; i < winningCombination.length; i++) {

            const winningIndex = winningCombination[i];

            cells[winningIndex].classList.add("winning-cell");

        }


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

    let boardFull = true;


    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            boardFull = false;

            break;
        }
    }


    if (boardFull) {

        gameActive = false;

        turnText.textContent =
            "🤝 Game Draw!";

        return;
    }


    // ======================================
    // CHANGE PLAYER
    // ======================================

    if (currentPlayer === "X") {

        currentPlayer = "O";

    } else {

        currentPlayer = "X";

    }


    turnText.textContent =
        "Player " + currentPlayer + "'s Turn";
}


// ==========================================
// RESTART GAME
// ==========================================

function restartGame() {

    // Empty all 9 positions
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];


    // Start with X
    currentPlayer = "X";


    // Enable game
    gameActive = true;


    // Clear all 9 cells
    for (let i = 0; i < cells.length; i++) {

        cells[i].textContent = "";

        cells[i].classList.remove("x");

        cells[i].classList.remove("o");

        cells[i].classList.remove("winning-cell");

    }


    // Update turn
    turnText.textContent =
        "Player X's Turn";
}


// ==========================================
// RESET SCORE
// ==========================================

function resetScore() {

    xScore = 0;

    oScore = 0;


    scoreX.textContent = "0";

    scoreO.textContent = "0";


    restartGame();
}


// ==========================================
// ADD CLICK EVENT TO ALL 9 CELLS
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
