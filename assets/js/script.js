const cells = document.querySelectorAll('[data-cell]');
let isXTurn = true;
let player1Wins = 0;

let player1Losses = 0;

let player1Draws = 0;

let player2Wins = 0;

let player2Losses = 0;

let player2Draws = 0;
let player1Name = '';
let player2Name = '';
let playWithComputer = false;

document.addEventListener('DOMContentLoaded', () => {
    const playerNamesModal = new bootstrap.Modal(document.getElementById('playerNamesModal'));

    const player2NameContainer = document.getElementById('player2NameContainer');
    document.getElementById('playWithComputer').addEventListener('change', () => {
        player2NameContainer.style.display = 'none';
        document.getElementById('player-mode').innerText = 'Computer Mode';
    });
    document.getElementById('enterPlayer2Name').addEventListener('change', () => {
        player2NameContainer.style.display = 'block';
        document.getElementById('player-mode').innerText = 'Player Mode';
    });

    document.getElementById('playerNamesForm').addEventListener('submit', (e) => {
        e.preventDefault();
        player1Name = document.getElementById('player1Name').value;
        playWithComputer = document.querySelector('input[name="player2Option"]:checked').value === 'computer';
        if (!playWithComputer) {
            player2Name = document.getElementById('player2Name').value;
        } else {
            player2Name = 'Computer';
        }
        playerNamesModal.hide();
        resetGame();
        updatePlayerTurn();
    });

    document.getElementById('new-game').addEventListener('click', () => {
        playerNamesModal.show();
    });
    document.getElementById('registerProfileLink').addEventListener('click', (e) => {
        e.preventDefault();
        playerNamesModal.show();
    });

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, {
            once: true
        });
    });
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (player1Name === '' || player2Name === '') {
                playerNamesModal.show();
                resetGame()
            }
        });
    });
});

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        showAlert(`${currentClass === 'X' ? player1Name : player2Name} wins!`);
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
        updatePlayerTurn();
        if (playWithComputer && !isXTurn) {
            setTimeout(computerMove, 2000); // Delay computer move by 2 seconds
        }
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
    updatePlayerTurn();
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

    document.getElementById('player1-wins').textContent = player1Wins;

    document.getElementById('player1-losses').textContent = player1Losses;

    document.getElementById('player1-draws').textContent = player1Draws;

    document.getElementById('player2-wins').textContent = player2Wins;

    document.getElementById('player2-losses').textContent = player2Losses;

    document.getElementById('player2-draws').textContent = player2Draws;

}

function updatePlayerTurn() {
    const playerTurnElement = document.getElementById('player-turn');
    playerTurnElement.textContent = `Player turn: ${isXTurn ? player1Name : player2Name}`;
}

function computerMove() {
    const emptyCells = [...cells].filter(cell => !cell.textContent);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.click();
}