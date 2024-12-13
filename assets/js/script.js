function startGame() {
    board = Array(9).fill(null);
    isGameActive = true;
    currentPlayer = 'X';
    aiDifficulty = difficultySelect.value;
    renderBoard();
}

function resetGame() {
    board = Array(9).fill(null);
    isGameActive = false;
    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = '';
    board.forEach((mark, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.textContent = mark || '';
        gameBoard.appendChild(cell);
    });
}
function makeMove(index, player) {
    if (!board[index]) {
        board[index] = player;
        renderBoard();
        if (checkWin(player)) {
            alert(`${player} wins!`);
            isGameActive = false;
        } else if (board.every(cell => cell)) {
            alert('It\'s a draw!');
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function aiMove() {
    let index;
    if (aiDifficulty === 'easy') {
        index = getRandomMove();
    } else if (aiDifficulty === 'medium') {
        index = getBestMove(false);
    } else {
        index = getBestMove(true);
    }
    makeMove(index, 'O');
}

function getRandomMove() {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
function getBestMove(isOptimal) {
    // Implement basic or minimax logic based on difficulty
    return isOptimal ? minimax(board, 'O').index : getRandomMove();
}
