document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');                               // Access grid class from DOM
    const healthDisplay = document.querySelector('.health');                    // Access health Text from DOM
    const levelDisplay = document.querySelector('.level');                      // Access Level Text From DOM
    const nextLevelButton = document.querySelector('.next-level');

    const gridWidth = 10;
    const gridHeight = 10;
    let cells = [];                                                             // Array that stores each grid
    let playerPosition = 22;                                                    // Position of the player in the grid
    let currentLevel = 1;                                                       // The starting level
    let playerHealth = 100;                                                     // The starting health

    function initializeGrid() {
        grid.innerHTML = '';                                                    // Assign an empty string to the starting grid.
        cells = [];                                                             // Reassign cells to be an empty array
        for (let i = 0; i < gridWidth * gridHeight; i++) {                      ///// for the first cell of the grid, and the cell position is less then gridwidth*gridheight
            const cell = document.createElement('div');                         // Create a new div element called cell
            grid.appendChild(cell);                                             // Append cell to the grid element.
            cells.push(cell);                                                   // Push cell into the cell array
        }                                                                       // Move to the next cell
        placeWalls();
        placeItems();
        placeEnemies();
        placeLadder();
        updateGridDisplay();
    }

    function placeWalls() {
        for (let i = 0; i < 20; i++) {                                                  ///// For index is less than 20             
            const wallPosition = Math.floor(Math.random() * gridWidth * gridHeight);    // Find random position in cell array bound to grid size
            cells[wallPosition].classList.add('cell-wall');                             // Assign random position to cell and place wall in it
        }                                                                                
    }

    function placeItems() {                                         
        for (let i = 0; i < 10; i++) {                                                  ///// For index is less than 10
            const itemPosition = Math.floor(Math.random() * gridWidth * gridHeight);    // Find random position in cell array bound to grid size
            cells[itemPosition].classList.add('cell-item');                             // Assign random position to cell and place item in it
        }                                                                               
    }

    function placeEnemies() {
        for (let i = 0; i < 5; i++) {  // 5 random enemies                              ///// For index is less than 5 
            const enemyPosition = Math.floor(Math.random() * gridWidth * gridHeight);   // Find random position in cell array bound to grid size
            cells[enemyPosition].classList.add('cell-enemy');                           // Assign random position to cell and place enemy in it
        }
    }

    function placeLadder() {
        const ladderPosition = Math.floor(Math.random() * gridWidth * gridHeight);      // Find random position in cell array bound to grid size
        cells[ladderPosition].classList.add('cell-ladder');                             // Assign random position to cell and place a ladder in it.
    }

    function updateGridDisplay() {
        cells.forEach((cell, index) => {                                                //// Foreach cell in cells array, pass player position
            if (index === playerPosition) {                                             // If the playersPosition is found in cell array
                cell.classList.add('cell-player');                                      // Add the cell player in it.
            }
        });
    }

    function startGame() {
        initializeGrid();
        window.addEventListener('keydown', handleKeyPress);
    }
    
    function placePlayer() {
        cells[playerPosition].classList.add('cell-player');
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
        placePlayer();
    }

    nextLevelButton.addEventListener('click', goToNextLevel);
    startGame();
});
