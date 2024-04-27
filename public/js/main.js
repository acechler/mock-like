document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const healthDisplay = document.getElementById('health');
    const levelDisplay = document.getElementById('level');
    const nextLevelButton = document.getElementById('next-level');

    const gridWidth = 10;
    const gridHeight = 10;
    let cells = [];
    let playerPosition = 22;  // Adjusted for a more central start if needed
    let currentLevel = 1;
    let playerHealth = 100;

    function initializeGrid() {
        grid.innerHTML = '';
        cells = [];
        for (let i = 0; i < gridWidth * gridHeight; i++) {
            const cell = document.createElement('div');
            grid.appendChild(cell);
            cells.push(cell);
        }
        placeWalls();
        placeItems();
        placeEnemies();
        placeLadder();
        updateGridDisplay();
    }

    function placeWalls() {
        for (let i = 0; i < 20; i++) {  // 20 random walls
            const wallPosition = Math.floor(Math.random() * gridWidth * gridHeight);
            cells[wallPosition].classList.add('cell-wall');
        }
    }

    function placeItems() {
        for (let i = 0; i < 10; i++) {  // 10 random items
            const itemPosition = Math.floor(Math.random() * gridWidth * gridHeight);
            cells[itemPosition].classList.add('cell-item');
        }
    }

    function placeEnemies() {
        for (let i = 0; i < 5; i++) {  // 5 random enemies
            const enemyPosition = Math.floor(Math.random() * gridWidth * gridHeight);
            cells[enemyPosition].classList.add('cell-enemy');
        }
    }

    function placeLadder() {
        const ladderPosition = Math.floor(Math.random() * gridWidth * gridHeight);
        cells[ladderPosition].classList.add('cell-ladder');
    }

    function updateGridDisplay() {
        cells.forEach((cell, index) => {
            if (index === playerPosition) {
                cell.classList.add('cell-player');
            }
        });
    }

    function startGame() {
        initializeGrid();
        window.addEventListener('keydown', handleKeyPress);
    }

    function handleKeyPress(e) {
        let newPlayerPosition = playerPosition;
        switch (e.key) {
            case 'ArrowUp':
                if (playerPosition >= gridWidth) newPlayerPosition -= gridWidth;
                break;
            case 'ArrowDown':
                if (playerPosition < gridWidth * (gridHeight - 1)) newPlayerPosition += gridWidth;
                break;
            case 'ArrowLeft':
                if (playerPosition % gridWidth !== 0) newPlayerPosition -= 1;
                break;
            case 'ArrowRight':
                if (playerPosition % gridWidth !== gridWidth - 1) newPlayerPosition += 1;
                break;
        }
        if (newPlayerPosition !== playerPosition && !cells[newPlayerPosition].classList.contains('cell-wall')) {
            movePlayer(newPlayerPosition);
        }
    }

    function movePlayer(newPlayerPosition) {
        if (cells[newPlayerPosition].classList.contains('cell-enemy')) {
            handleCombat(newPlayerPosition);
        } else if (cells[newPlayerPosition].classList.contains('cell-item')) {
            pickUpItem(newPlayerPosition);
        } else if (cells[newPlayerPosition].classList.contains('cell-ladder')) {
            goToNextLevel();
        } else {
            cells[playerPosition].classList.remove('cell-player');
            playerPosition = newPlayerPosition;
            cells[playerPosition].classList.add('cell-player');
        }
    }

    function handleCombat(enemyPosition) {
        // Simple combat logic here
        console.log('Combat with enemy at position', enemyPosition);
        // Reduce health as an example
        playerHealth -= 10;
        healthDisplay.textContent = 'Health: ' + playerHealth;
        // Remove enemy after combat for simplicity
        cells[enemyPosition].classList.remove('cell-enemy');
    }

    function pickUpItem(itemPosition) {
        console.log('Picked up item at position', itemPosition);
        cells[itemPosition].classList.remove('cell-item');
    }

    function goToNextLevel() {
        currentLevel++;
        levelDisplay.textContent = 'Level: ' + currentLevel;
        initializeGrid();
    }

    nextLevelButton.addEventListener('click', goToNextLevel);
    startGame();
});
