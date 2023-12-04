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
function Cell(){
    
}
el1