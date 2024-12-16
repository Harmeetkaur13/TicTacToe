const cells = document.querySelectorAll('[data-cell]');
let isXTurn = true;
let wins = 0;
let losses = 0;
let draws = 0;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, {
        once: true
    });
});

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        showAlert(`${currentClass} wins!`);
        if (currentClass === 'X') {
            wins++;
        } else {
            losses++;
        }
        updateScore();
        resetGame();
    } else if (isDraw()) {
        showAlert('Draw!');
        draws++;
        updateScore();
        resetGame();
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, {
            once: true
        });
    });
    isXTurn = true;
}

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.padding = '20px';
    alertBox.style.backgroundColor = 'white';
    alertBox.style.border = '1px solid black';
    alertBox.style.zIndex = '1000';
    document.body.appendChild(alertBox);

    setTimeout(() => {
        document.body.removeChild(alertBox);
    }, 2000);
}

function updateScore() {
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('draws').textContent = draws;
}

let player1Wins = 0;
let player1Losses = 0;
let player1Draws = 0;
let player2Wins = 0;
let player2Losses = 0;
let player2Draws = 0;

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        showAlert(`${currentClass} wins!`);
        if (currentClass === 'X') {
            player1Wins++;
            player2Losses++;
        } else {
            player2Wins++;
            player1Losses++;
        }
        updateScore();
        resetGame();
    } else if (isDraw()) {
        showAlert('Draw!');
        player1Draws++;
        player2Draws++;
        updateScore();
        resetGame();
    } else {
        swapTurns();
    }
}

function updateScore() {
    document.getElementById('player1-wins').textContent = player1Wins;
    document.getElementById('player1-losses').textContent = player1Losses;
    document.getElementById('player1-draws').textContent = player1Draws;
    document.getElementById('player2-wins').textContent = player2Wins;
    document.getElementById('player2-losses').textContent = player2Losses;
    document.getElementById('player2-draws').textContent = player2Draws;
}