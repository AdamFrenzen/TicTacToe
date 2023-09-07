function startNewGame() {
    if(!players[0].name || !players[1].name) { 
        alert('Please enter custom player names.')
        return 
    }

    resetGameStatus()
    
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function resetGameStatus() {
    gameIsOver = false;
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';

    let gridIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gridEle = gameBoardElements.children[gridIndex]
            gridEle.textContent = '';
            gridEle.classList.remove('disabled')
            gridIndex++;
        }
    }
}

function selectGameField(event) {
    const selectedField = event.target;

    const selectedCol = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;
    if (gameData[selectedRow][selectedCol] > 0 || gameIsOver) { 
        return; 
    }

    gameData[selectedRow][selectedCol] = activePlayer+1;
    console.log(gameData)

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');

    const winnerID = checkForGameOver();
    if (winnerID !== 0) {
        endGame(winnerID)
    }

    // switch player
    currentRound++;
    activePlayer = Number(!Boolean(activePlayer));
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function checkForGameOver() {
    // checkCol
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]) {
                return gameData[i][0]
            }
    }
    // checkRow
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]) {
                return gameData[0][i]
            }
    }
    // checkDiag
    if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
        return gameData[0][0]
    }
    if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {
        return gameData[2][0]
    }
    // checkDraw
    if (currentRound === 9) {
        return -1
    }

    return 0
}

function endGame(winnnerID) {
    gameIsOver = true
    gameOverElement.style.display = 'block';

    if (winnnerID > 0) {
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnnerID-1].name
    } else {
        gameOverElement.firstElementChild.textContent = "It's a draw."
    }
    
}