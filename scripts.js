const gameboard1 = document.querySelector('#sund-gameboard')
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
            // board[row].push(Cell().getValue());
            const boardCell = document.createElement('div');
            boardCell.className ='board__cell';
            boardCell.setAttribute('data-index', i);
            boardCell.innerText = Cell().getValue();
            gameboard1.appendChild(boardCell); 
            i++;
        }
    }
    i = 0;
    // console.table(board);
    const getBoard = () => board;
    return { getBoard };



})();


function Cell() {
    let value = 'Cell';
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player.token;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }

// console.table(gameboard.board);

function createPlayer (name,token) {
    // const token = name + '.token';
    return { name, token };
}
const el1 = createPlayer('Elromco 1', 'x');
const el2 = createPlayer('Elromco 2', 'o');

let newBoard = gameboard.getBoard();
console.table(newBoard)
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
