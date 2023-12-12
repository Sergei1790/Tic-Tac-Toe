// Making variables for the screens
const round = document.querySelector('#round');
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
	const dropToken = (pickedCell, player) => {
		pickedCell.cellContent.addToken(player.token);
		player.pickedCellsHistory.push(pickedCell.cellIndex);
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
const el1 = createPlayer('Elromco 1', 'x');
const el2 = createPlayer('Elromco 2', 'o');

// game module pattern
const game = (function() {
	
	const players = [el1, el2];
	let activePlayer = players[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const printNewRound = () => {
		gameboard.printBoard();
		console.log(`${getActivePlayer().name}'s turn.`);
	};

	const playRound = (selectedCell) => {

		const pickedCell = gameboard.getBoard().flat().find((cell) => cell.cellIndex == selectedCell);
	
		if(pickedCell.cellContent.getValue() === ''){
            	// Drop a token for the current player
				console.log(
					`Dropping ${getActivePlayer().name}'s token into cell with number ${selectedCell}...`
				);
				gameboard.dropToken(pickedCell, getActivePlayer());
				/*  This is where we would check for a winner and handle that logic,
					such as a win message. */

				const winConditions = ['123', '456', '789', '147', '258', '369', '159', '357'];
				console.log(getActivePlayer().name, 'player.pickedCellsHistory ', getActivePlayer().pickedCellsHistory);
				pickedCellsHistorySorted = getActivePlayer().pickedCellsHistory.sort(function(a, b) { return a - b; }).join('');
				console.log({pickedCellsHistorySorted});
				for (let winCondition of winConditions) {
					if(winCondition === pickedCellsHistorySorted) {
						console.log('WIIIIIIIIIIIIIIIIN!');
						round.textContent = (parseInt(round.textContent, 10) + 1); 

						const scoreElement = activePlayer === players[0] ? player1Score : player2Score;

						scoreElement.textContent = (parseInt(scoreElement.textContent, 10) + 1);

						endGame();
					}
				}

				// Switch player turn
				switchPlayerTurn();
				printNewRound();
        } else {
            console.log('The selected cell is not empty. Cannot add token.');
        }

		const availableCells = gameboard.getBoard().flat().filter((cell) => cell.cellContent.getValue() === '');
		console.log('availableCells', availableCells.length);
		if(!availableCells.length){
			console.log('No more available cells');
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

		const endgameText = document.createElement('div');
		endgameText.className = 'sund-game-end__text';
		endgameText.innerText = 'Game Ended!'

		const endgameRestart = document.createElement('button');
		endgameRestart.className = 'sund-game-end__restart';
		endgameRestart.innerText = 'Restart!';

		document.body.appendChild(endgameModal);
		endgameModal.append(endgameText, endgameRestart);
		endgameRestart.addEventListener('click', () => {
			document.body.removeChild(endgameModal);
			restartGame(); 
		});
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

