const gameboard1 = document.querySelector('#sund-gameboard')


const gameboard = (function () {
    const board = [];
    for(let row = 0; row<3; row++){
        board[row]=[];
        for(let col = 0; col<3; col++){
            // board[row].push('Cell');
            board[row].push(cell().getValue());
        }
    }
    // console.table(board);
    const getBoard = () => board;
    return { getBoard };
})();
function cell() {
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