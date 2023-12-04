const gameboard1 = document.querySelector('#sund-gameboard')
const boardCell = document.createElement('div');
boardCell.className ='board__cell';
boardCell.setAttribute('data-index');
gameboard1.appendChild(boardCell); 