const gameboard1 = document.querySelector('#sund-gameboard')

function gameboard() {
    const board = [];
    for(let row = 0; row<3; row++){
        board[row]=[];
        for(let col = 0; col<3; col++){
            board[row].push(cell().getValue());
            // board[row].push(cell().addToken(el1));
        }
    }
    // console.table(board);
    const getBoard = () => board;
    return { getBoard };
}
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
function createPlayer (name,token) {
    return { name, token };
}
const el1 = createPlayer('Elromco 1', 'x');
const el2 = createPlayer('Elromco 2', 'o');
console.log(el1);

console.table(gameboard().getBoard());
console.log(cell().getValue());