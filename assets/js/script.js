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