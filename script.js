// ==========================================
// TIC TAC TOE - SCRIPT.JS
// ==========================================


// Get all game cells
const cells = document.querySelectorAll(".cell");

// Get game information elements
const turnText = document.getElementById("turnText");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

// Get buttons
const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");


// ==========================================
// GAME VARIABLES
// ==========================================

// 9 empty positions
let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

// First player is X
let currentPlayer = "X";

// Game is active
let gameActive = true;

// Scores
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
// CELL CLICK FUNCTION
// ==========================================

function handleCellClick(event) {

    // Get clicked cell
    const cell = event.target;

    // Get cell index
    const index = Number(cell.getAttribute("data-index"));


    // Do nothing if:
    // 1. Cell is already filled
    // 2. Game has ended

    if (board[index] !== "" || !gameActive) {
        return;
    }


    // Put current player's symbol
    board[index] = currentPlayer;

    cell.textContent = currentPlayer;


    // Add X or O class
    if (currentPlayer === "X") {

        cell.classList.add("x");

    } else {

        cell.classList.add("o");

    }


    // Check result
    checkResult();
}


// ==========================================
// CHECK GAME RESULT
// ==========================================

function checkResult() {

    let winnerFound = false;


    // Check every winning combination
    for (let combination of winningCombinations) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];


        // Check whether three cells are equal
        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            winnerFound = true;


            // Highlight winning cells
            cells[a].classList.add("winning-cell");
            cells[b].classList.add("winning-cell");
            cells[c].classList.add("winning-cell");


            break;
        }
    }


    // ======================================
    // WINNER
    // ======================================

    if (winnerFound) {

        gameActive = false;


        if (currentPlayer === "X") {

            xScore++;

            scoreX.textContent = xScore;

            turnText.textContent = "🎉 Player X Wins!";

        } else {

            oScore++;

            scoreO.textContent = oScore;

            turnText.textContent = "🎉 Player O Wins!";

        }


        return;
    }


    // ======================================
    // DRAW
    // ======================================

    if (!board.includes("")) {

        gameActive = false;

        turnText.textContent = "🤝 Game Draw!";

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


    // Update turn text
    turnText.textContent =
        "Player " + currentPlayer + "'s Turn";
}


// ==========================================
// RESTART GAME
// ==========================================

function restartGame() {

    // Empty the board
    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    // Start with X
    currentPlayer = "X";


    // Activate game
    gameActive = true;


    // Clear every cell
    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("x");

        cell.classList.remove("o");

        cell.classList.remove("winning-cell");

    });


    // Reset turn message
    turnText.textContent = "Player X's Turn";
}


// ==========================================
// RESET SCORE
// ==========================================

function resetScore() {

    // Reset X score
    xScore = 0;

    // Reset O score
    oScore = 0;


    // Display zero
    scoreX.textContent = "0";

    scoreO.textContent = "0";


    // Also restart board
    restartGame();
}


// ==========================================
// ADD CLICK EVENTS TO CELLS
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
