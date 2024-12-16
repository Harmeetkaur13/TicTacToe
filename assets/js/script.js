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
};
document.getElementById('main-menu').addEventListener('click', () => {
    window.location.href = 'index.html';
});


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

function minimax(newBoard, player) {
    const availableSpots = newBoard.map((cell, index) => cell === null ? index : null).filter(index => index !== null);

    if (checkWin('X', newBoard)) return {
        score: -10
    };
    if (checkWin('O', newBoard)) return {
        score: 10
    };
    if (availableSpots.length === 0) return {
        score: 0
    };

    const moves = [];
    availableSpots.forEach(spot => {
        const move = {};
        move.index = spot;
        newBoard[spot] = player;
        const result = minimax(newBoard, player === 'O' ? 'X' : 'O');
        move.score = result.score;
        newBoard[spot] = null;
        moves.push(move);
    });

    return player === 'O' ?
        moves.reduce((best, move) => (move.score > best.score ? move : best), {
            score: -Infinity
        }) :
        moves.reduce((best, move) => (move.score < best.score ? move : best), {
            score: Infinity
        });
}

function checkWin(player, boardState = board) {
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
    return winPatterns.some(pattern => pattern.every(index => boardState[index] === player));
}