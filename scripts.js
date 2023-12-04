function toggleClassOnClick(elem){
    elem.classList.toggle('active');
    elem.parentElement.classList.toggle('active')
}

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
// const gameboard = {
//     gameboard:[null,null,null,
//         null,null,null,
//         null,null,null]
// }
const gameboard = (function () {
    const board = [];
    let i = 1;
    for(let row = 0; row<3; row++){
     
        board[row]=[];
        for(let col = 0; col<3; col++){
            board[row].push('Cell');
            // board[row].push(Cell());

            const boardCell = document.createElement('div');
            boardCell.className ='board__cell';
            boardCell.setAttribute('data-index', i);
            boardCell.innerText = 'Cell';
            gameboard1.appendChild(boardCell); 
            i++;
        }
    }
    i = 0;
    console.log(i);
    // return {board};





    const getBoard = () => board;

    const dropToken = (column, player) => {
        // Our board's outermost array represents the row,
        // so we need to loop through the rows, starting at row 0,
        // find all the rows that don't have a token, then take the
        // last one, which will represent the bottom-most empty cell
        const availableCells = board.filter((row) => row[column].getValue() === 'Cell').map(row => row[column]);
    
        // If no cells make it through the filter, 
        // the move is invalid. Stop execution.
        if (!availableCells.length) return;
    
        // Otherwise, I have a valid cell, the last one in the filtered array
        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addToken(player);
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


        
    
})();



// console.table(gameboard.board);


// let newBoard = gameboard.board;
// newBoard[chooseRow][chooseCell] = 'X'
// console.log(newBoard[chooseRow]);
// newBoard.map(function () {
//     return 'new Cell';
// });


// let newBoard = gameboard.board.map(function(cell) {
//     return cell.length;
// });
// let newBoard = gameboard.board.map(item => item.length)

// let newBoard = gameboard.board.map(function (row) {
//     return row.map(function () {
//         return 'new Cell';
//     });
// });



function createPlayer (name,token) {
    // const token = name + '.token';
    return { name, token };
}
const el1 = createPlayer('Elromco 1', 'x');

const el2 = createPlayer('Elromco 2', 'o');


// console.log(gameboard.gameboard);


let newBoard = gameboard.board;
function updateBoard(playerToken){
    newBoard = newBoard.map(function (row, rowIndex) {
        if(rowIndex === chooseRow){
            return row.map(function (cell, cellIndex) {
                return cellIndex === chooseCell ? playerToken : cell
            });
        } else{
            return row;
        }
    });
}
// let chooseRow = 1;
// let chooseCell = 2;

// updateBoard(el1.token)

// chooseRow = 0;
// chooseCell = 2;
// updateBoard(el2.token)
// console.table(newBoard);

let chooseRow;
let chooseCell;

const gameRound = (function () {
    // chooseRow = +prompt(`${el1.name} chooseRow`);
    // chooseCell = +prompt(`${el1.name} chooseCell`);
    chooseRow = 0;
    chooseCell = 1;
    updateBoard(el1.token);
    // chooseRow = +prompt(`${el2.name} chooseRow`);
    // chooseCell = +prompt(`${el2.name} chooseCell`);
    chooseRow = 1;
    chooseCell = 2;
    updateBoard(el2.token);
    console.table(newBoard);
})()