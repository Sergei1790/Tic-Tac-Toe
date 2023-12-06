const screenBoard = document.querySelector('#sund-gameboard')
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

function gameboard() {
	const board = [];
	// let i = 1;
	for (let row = 0; row < 3; row++) {
		board[row] = [];
		for (let col = 0; col < 3; col++) {
			board[row].push(Cell());
			// const boardCell = document.createElement('div');
			// boardCell.className ='board__cell';
			// boardCell.setAttribute('data-index', i);
			// boardCell.innerText = Cell().getValue();
			// screenBoard.appendChild(boardCell); 
			// i++;
		}
		// i = 0;
	}
	const getBoard = () => board;

	const dropToken = (chooseRow, chooseCell, player) => {
		// Our board's outermost array represents the row,
		// so we need to loop through the rows, starting at row 0,
		// find all the rows that don't have a token, then take the
		// last one, which will represent the bottom-most empty cell

		// const availableCells = board.filter((row) => row[chooseCell].getValue() === 'Cell').map(row => row[chooseCell]);
		
        // If no cells make it through the filter, 
        // the move is invalid. Stop execution.
		// if (!availableCells.length) return;

        if(board[chooseRow][chooseCell].getValue() === 'Cell'){
            board[chooseRow][chooseCell].addToken(player.token);
        } else {
            console.log('The selected cell is not empty. Cannot add token.');
        }
		// Otherwise, I have a valid cell, the last one in the filtered array
		// board[chooseRow][chooseCell].addToken(player.token);
        
	};
	// This method will be used to print our board to the console.
	// It is helpful to see what the board looks like after each turn as we play,
	// but we won't need it after we build our UI
	const printBoard = () => {
		const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
		console.log(boardWithCellValues);
	};

	// Here, we provide an interface for the rest of our
	// application to interact with the board
	return { getBoard, dropToken, printBoard };

}

function Cell() {
	let value = 'Cell';

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

// console.table(gameboard.board);

function createPlayer(name, token) {
	// const token = name + '.token';
	return { name, token };
}
const el1 = createPlayer('Elromco 1', 'x');
const el2 = createPlayer('Elromco 2', 'o');

function GameController() {
	const board = gameboard();
	const players = [el1, el2];
	let activePlayer = players[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};
	const getActivePlayer = () => activePlayer;

	const printNewRound = () => {
		board.printBoard();
		console.log(`${getActivePlayer().name}'s turn.`);
	};

	const playRound = () => {
		const chooseRow = +prompt(`${getActivePlayer().name} chooseRow`);
		const chooseCell = +prompt(`${getActivePlayer().name} chooseCell`);
		// Drop a token for the current player
		console.log(
			`Dropping ${getActivePlayer().name}'s token into cell with coordinates ${chooseRow} ${chooseCell}...`
		);
		board.dropToken(chooseRow, chooseCell, getActivePlayer());

		/*  This is where we would check for a winner and handle that logic,
			such as a win message. */

		// Switch player turn
		switchPlayerTurn();
		printNewRound();
	};

	// Initial play game message
	printNewRound();
	// For the console version, we will only use playRound, but we will need
	// getActivePlayer for the UI version, so I'm revealing it now
	return {
		playRound,
		getActivePlayer
	};
}
// function ScreenController(){
// 	const game = GameController();
// 	const board = game
// }
// game.playRound();
// game.playRound();


