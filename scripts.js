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
            board[row].push(Cell());
        }
    }
    return {board};
})();
console.log(gameboard);
function createPlayer (name) {
    const token = name + '.token';
    return { name, token };
}
const el1 = createPlayer('Elromco 1');
const el2 = createPlayer('Elromco 2');
console.log({el1});
// console.log(gameboard.gameboard);
function cell(){
    let value = 0;

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
const dropToken = (column, player) => {
    // Our board's outermost array represents the row,
    // so we need to loop through the rows, starting at row 0,
    // find all the rows that don't have a token, then take the
    // last one, which will represent the bottom-most empty cell
    const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

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
