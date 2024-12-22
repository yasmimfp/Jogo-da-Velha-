const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X'; // Jogador começa como "X"
const machinePlayer = 'O'; // Máquina joga como "O"

cells.forEach(cell => {
    cell.addEventListener('click', handlePlayerMove, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handlePlayerMove(e) {
    const cell = e.target;
    if (currentPlayer === 'X') {
        makeMove(cell, 'X');
        if (!checkWinner() && !isDraw()) {
            setTimeout(handleMachineMove, 500);
        }
    }
}

function handleMachineMove() {
    const emptyCells = [...cells].filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[0];
        makeMove(randomCell, machinePlayer);
        checkWinner();
    }
}

function makeMove(cell, player) {
    cell.textContent = player;
    cell.classList.add('taken');
    if (checkWinner()) {
        endGame(`${player} venceu!`);
    } else if (isDraw()) {
        endGame('Empate!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.classList.contains('taken'));
}

function endGame(message) {
    winnerMessage.textContent = message;
    winnerMessage.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    cells.forEach(cell => cell.removeEventListener('click', handlePlayerMove));
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
        cell.addEventListener('click', handlePlayerMove, { once: true });
    });

    currentPlayer = 'X';
    winnerMessage.classList.add('hidden');
    restartButton.classList.add('hidden');
}
