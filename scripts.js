// 1. Создать игровое поле 3 на 3
// 2. Создать игрока 1
// 3. Создать игрока 2
// 4. Прописати знаки x/0
// 5. Прописати умови при яких виграє якийсь із знаків
// 6. Написати код для підрахунку раундів/спроб
// 7. Прописати кількість раундів необхідних для виграшу
// 8. Прописати умови нічиї 
// 9. Прописати умови за яких буде вибрано переможця по закінченню раундів 
// 10. Стерти історію, почати заново

const gameboard = (function() {
	const board = [];
	// let i = 1;
	for (let row = 0; row < 3; row++) {
		board[row] = [];
		for (let col = 0; col < 3; col++) {
			board[row].push({
				cellContent:Cell(),
				cellIndex: row * 3 + col + 1,
			});
		}
	}
	const getBoard = () => board;

	const dropToken = (selectedCell, player) => {
	// const dropToken = (pickedCell, player) => {
	// 	pickedCell.cellContent.addToken(player.token);
		
			
		const pickedCell = board.flat().find((cell) => cell.cellIndex == selectedCell);

		if(pickedCell.cellContent.getValue() === ''){
			pickedCell.cellContent.addToken(player.token);
		}  else {
			console.log('The selected cell is not empty. Cannot add token.');
			return 1;
		}

		const availableCells = board.flat().filter((cell) => cell.cellContent.getValue() === '');
		console.log('availableCells', availableCells);

		if(!availableCells.length){
			console.log('No more available cells');
			return 1;
		}
		
     
        
	};
	// This method will be used to print our board to the console.
	// It is helpful to see what the board looks like after each turn as we play,
	// but we won't need it after we build our UI
	const printBoard = () => {
		const boardWithCellValues = board.map((row) => row.map((cell) => cell.cellContent.getValue()))
		console.log(boardWithCellValues);
	};

	// Here, we provide an interface for the rest of our
	// application to interact with the board
	return { getBoard, dropToken, printBoard };

})()

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


function createPlayer(name, token) {
	// const token = name + '.token';
	return { name, token };
}
const el1 = createPlayer('Elromco 1', 'x');
const el2 = createPlayer('Elromco 2', 'o');

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

		if(gameboard.dropToken(selectedCell, getActivePlayer()) !== 1){
			console.log(
				`Dropping ${getActivePlayer().name}'s token into cell with number ${selectedCell}...`
			);
			console.log('dropToken executed');
			switchPlayerTurn();
			printNewRound();
		} else{
			console.log('dropToken NOT executed');
		}


		
		// const availableCells = gameboard.getBoard().flat().filter((cell) => cell.cellContent.getValue() === '');
		// const pickedCell = gameboard.getBoard().flat().find((cell) => cell.cellIndex == selectedCell);
		// console.log('availableCells', availableCells);
		// if(pickedCell.cellContent.getValue() === ''){
        //     	// Drop a token for the current player
		// 		console.log(
		// 			`Dropping ${getActivePlayer().name}'s token into cell with number ${selectedCell}...`
		// 		);
		// 		gameboard.dropToken(pickedCell, getActivePlayer());
		// 		/*  This is where we would check for a winner and handle that logic,
		// 			such as a win message. */

		// 		// Switch player turn
		// 		switchPlayerTurn();
		// 		printNewRound();
        // } else if(!availableCells.length){
        //     console.log('No more available cells');
        // } else {
        //     console.log('The selected cell is not empty. Cannot add token.');
        // }
	};

	// Initial play game message
	printNewRound();
	// For the console version, we will only use playRound, but we will need
	// getActivePlayer for the UI version, so I'm revealing it now
	return {
		playRound,
		getActivePlayer
	};
})()


const gameScreen = (function(){
    const screenBoard = document.querySelector('#sund-gameboard');
    const screenOrder = document.querySelector('.sund-screen__order');
   
    function updateBoard(){
       
		screenBoard.textContent = "";

		const board = gameboard.getBoard();
		const activePlayer = game.getActivePlayer();
		screenOrder.innerText = `It is time for ${activePlayer.name}'s turn`;

        board.forEach(row => {
            row.forEach(cell => {
                const boardCell = document.createElement('div');
                boardCell.className ='board__cell';
                // boardCell.setAttribute('data-index', index);
                // or
                boardCell.dataset.index = cell.cellIndex;
                boardCell.innerText = cell.cellContent.getValue();
                screenBoard.appendChild(boardCell); 
            });
         });
    }
    updateBoard();

    function clickHandler(e){
        const selectedCell = e.target.dataset.index;
        game.playRound(selectedCell);
        updateBoard();
    }
    screenBoard.addEventListener('click', clickHandler)
    

})()


