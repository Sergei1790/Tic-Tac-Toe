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
    for(let row = 0; row<3; row++){
        board[row]=[];
        for(let col = 0; col<3; col++){
            board[row].push('Cell');
            // board[row].push(Cell());
        }
    }
    return {board};
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
    chooseRow = +prompt(`${el1.name} chooseRow`);
    chooseCell = +prompt(`${el1.name} chooseCell`);
    updateBoard(el1.token);
    chooseRow = +prompt(`${el2.name} chooseRow`);
    chooseCell = +prompt(`${el2.name} chooseCell`);
    updateBoard(el2.token);
    console.table(newBoard);
})()