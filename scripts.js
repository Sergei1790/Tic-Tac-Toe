// Making variables for the screens
const round = document.querySelector('#round');
const player1Name = document.querySelector('#player1-name');
const player2Name = document.querySelector('#player2-name');
const player1Score = document.querySelector('#player1-score');
const player2Score = document.querySelector('#player2-score');

// gameboard module pattern (factory function in IIFE (Immediately Invoked Function Expression))
const gameboard = (function() {
	// creating 2d board array
	const board = [];
	for (let row = 0; row < 3; row++) {
		board[row] = [];
		for (let col = 0; col < 3; col++) {
			board[row].push({
				cellContent:Cell(),
				cellIndex: row * 3 + col + 1, // formula to make cellindex 1,2,3,4,5....
			});
		}
	}

	// Closure to use board variable in another funcions
	const getBoard = () => board;

	// adding 'x' or 'o', depending on player
	// pickedCell is cell with corresponding cell.cellIndex
	// player - current player object
	const dropToken = (pickedCell, player) => {
		pickedCell.cellContent.addToken(player.token);

		// We are adding corresponding cell.cellIndex to player object in order 
		// to save history of his turn to check if he win or not after last 'x' or 'o' placement
		player.pickedCellsHistory+=pickedCell.cellIndex;
	};

	// This method will be used to print our board to the console.
	// It is helpful to see what the board looks like after each turn as we play,
	// but we won't need it after we build our UI
	const printBoard = () => {
		const boardWithCellValues = board.map((row) => row.map((cell) => cell.cellContent.getValue()))
		console.log(boardWithCellValues);
	}; 

	const clearBoard = () => {
		board.forEach(row => {
			row.forEach(cell => {
				cell.cellContent = Cell(); // Reset cell content to a new Cell instance
			});
		});
	};

	return { getBoard, dropToken, printBoard, clearBoard };

})()
// /gameboard module pattern

// adding this Cell func into board
function Cell() {
	let value = '';

	// Accept a player's token to change the value of the cell
	const addToken = (player) => {
		value = player;
	};

	// How we will retrieve the current value of this cell through closure
	const getValue = () => value;

	return {
		addToken,
		getValue
	};
}

// Factory function to create player
function createPlayer(name, token) {
	const pickedCellsHistory = [];
	return { name, token, pickedCellsHistory};
}
const player1 = createPlayer('Serg', 'x');
const player2 = createPlayer('Elen', 'o');

// Show player names on screen
player1Name.innerText = player1.name;
player2Name.innerText = player2.name;

// game module pattern
const game = (function() {
	
	const players = [player1, player2];
	let activePlayer = players[0];
	
	// Variable that we will use ti check if there any cell where we can place' x' or 'o'
	let availableCells = '';

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const printNewRound = () => {
		gameboard.printBoard();
		console.log(`${getActivePlayer().name}'s turn.`);
	};

	// Here
	// when clicking on gameboard html cell on screen we catch data-index number (data-index="1")
	// this data-index of (for example cell with data-index="1" will send selectedCell - "1")
	// into playround ((1) for example)
	const playRound = (selectedCell) => {

		// We create pickedCell cariable which takes gameboard board object
		// this 2d object we transform in 1d(flat()), then we find cell 
		// with cellIndex that = selectedCell
		const pickedCell = gameboard.getBoard().flat().find((cell) => cell.cellIndex == selectedCell);
	
		// if cell is empty, so nobody place 'x' or 'o' there  
		// we are adding 'x' or 'o', depending on a player
		if(pickedCell.cellContent.getValue() === ''){
            	// Drop a token for the current player
				console.log(
					`Dropping ${getActivePlayer().name}'s token into cell with number ${selectedCell}...`
				);

				gameboard.dropToken(pickedCell, getActivePlayer());


				// after we dropToken (added 'x' or 'o'), we are creating winconditions logic
				// '123' here is winning indexes of cells 
				// 123
				// 456
				// 789 (this 3 rows is a board)
				const winConditions = [
					['1', '2', '3'],
					['4', '5', '6'],
					['7', '8', '9'],
					['1', '4', '7'],
					['2', '5', '8'],
					['3', '6', '9'],
					['1', '5', '9'],
					['3', '5', '7']
				];
				console.log(getActivePlayer().name, 'player.pickedCellsHistory ', getActivePlayer().pickedCellsHistory);
				
				// as player can drop token not in format 1-2-3, but also 2-1-4-3 or 3-1-2-9 etc
				// checking if wincondition placements (1,2,3) are present in
				// getActivePlayer().pickedCellsHistory ((1,6,3,4,2) for example) 
				// and if player won or continue game
				for (let winCondition of winConditions) {
					// Check if all elements in winCondition are present in getActivePlayer().pickedCellsHistory
					if (winCondition.every(cell => getActivePlayer().pickedCellsHistory.includes(cell))) {
						console.log('WIIIIIIIIIIIIIIIIN!');
						// increasing number of game rounds on the screen div#round
						round.textContent++;
						// or -  round.textContent = (parseInt(round.textContent, 10) + 1); 

						// checking what player won and adding his win to corresponding win span
						const scoreElement = activePlayer === players[0] ? player1Score : player2Score;
						scoreElement.textContent++;
						// or - scoreElement.textContent = (parseInt(scoreElement.textContent, 10) + 1);

						endGame();
					}
				}

				// Switch player turn
				switchPlayerTurn();
				printNewRound();

		// if we are trying to add 'x' or 'o' where there is already 'x' or 'o' 
		// do not execute droptoken and not switch turn
        } else {
            console.log('The selected cell is not empty. Cannot add token.');
        }

		// Checking if there any cell where we can place' x' or 'o'
		// if no more availableCells - finish the game
		availableCells = gameboard.getBoard().flat().filter((cell) => cell.cellContent.getValue() === '');
		console.log('availableCells', availableCells.length);
		if(!availableCells.length){
			console.log('No more available cells');
			round.textContent++; 
			endGame();
		}
		
	};

	// Initial play game message
	printNewRound();

	// creating end game modal, activating restart function and removing end game modal
	const endGame = () => {
        console.log('Game ended...');

        const endgameModal = document.createElement('div');
		endgameModal.className = 'sund-game-end';

		const endgameModalOverlay = document.createElement('div');
		endgameModalOverlay.className = 'sund-game-end__overlay';

		const endgameText = document.createElement('div');
		endgameText.className = 'sund-game-end__text';
		if(!availableCells.length){
			endgameText.innerText = `Game Ended! It is a Draw!`
		} else{
			endgameText.innerText = `Game Ended! ${activePlayer.name} Won!`
		}
		
		

		const endgameRestart = document.createElement('button');
		endgameRestart.className = 'sund-game-end__restart';
		endgameRestart.innerText = 'Restart!';

		document.body.append(endgameModalOverlay, endgameModal);
		endgameModal.append(endgameText, endgameRestart);
		endgameRestart.addEventListener('click', () => {
			document.body.removeChild(endgameModal);
			document.body.removeChild(endgameModalOverlay);
			restartGame(); 
		});
		return { endgameText }
    };

	// restaring the game while resetting all needed params
	const restartGame = () => {
        console.log('Restarting the game...');
        activePlayer = players[0];
        gameboard.clearBoard();
        gameScreen.updateBoard();
		players.forEach(player => {
			player.pickedCellsHistory = [];
		});
        printNewRound();
    };


	return {
		playRound,
		getActivePlayer,
		endGame,
		restartGame
	};
})()
// /game module pattern

// screen interaction module pattern
const gameScreen = (function(){

	// selectiong gameboard and div where players turn will be showing
    const screenBoard = document.querySelector('#sund-gameboard');
    const screenOrder = document.querySelector('.sund-screen__order');
   

    const updateBoard = function(){
       
		// clearing the board on screen to draw updated version
		screenBoard.textContent = "";

		// taking board object from gameboard module pattern
		const board = gameboard.getBoard();

		// taking activePlayer object from gameboard module pattern
		const activePlayer = game.getActivePlayer();

		// Printing on the screen what player turn it is
		screenOrder.innerText = `It is time for ${activePlayer.name}'s turn`;

		// for board object from gameboard module pattern we draw html board on the screen
        board.forEach(row => {
            row.forEach(cell => {
                const boardCell = document.createElement('div');
                boardCell.className ='board__cell';

				// taking number from board object [cellIndex] and giving it to our cell data-index
                // boardCell.setAttribute('data-index', cell.cellIndex);
                // or
                boardCell.dataset.index = cell.cellIndex;

				// for our cell content ('x', 'o', or empty) we take from board object [cellContent]
                boardCell.innerText = cell.cellContent.getValue();

				// adding created cell to screen board
                screenBoard.appendChild(boardCell); 
            });
         });
    }

	// initial instance of drawing gameboard
    updateBoard();

	// adding 'click' event on gameboard on screen
    function clickHandler(e){

		// when clicking on gameboard we are selecting (e.target)  
		// the html element inside gameboard where we are directly clicking
		// and in this element we catch data-index number (data-index="1")
        const selectedCell = e.target.dataset.index;

		// this data-index of selectedCell (for example cell with data-index="1" will send "1")
		// into game module pattern into playround
        game.playRound(selectedCell);

		// after game.playRound(selectedCell) finished we draw new board
        updateBoard();
    }
    screenBoard.addEventListener('click', clickHandler)
    
	return {updateBoard}
})()
// /screen interaction module pattern

