// GAME LOGIC
let boardGame = document.getElementById('board-game');
let boardSize = 9;
let bombRand = Math.floor(Math.random() * 100) + 1;
let cell = '<div class="cell"></div>';
let bombCount = 0;
let bombMax = 10;
let boardMap = [];

boardGame.style.width = boardSize+'50px';
boardGame.style.height = boardSize+'50px';

for (var i = 0; i < boardSize; i++) {
	boardMap[i]=[];
	for (var j = 0; j < boardSize; j++) {
		bombRand = Math.floor(Math.random() * 100) + 1;
		cell = '<div class="cell" id="cell-'+i+j+'"></div>';
		boardMap[i][j] = 0;
		if(bombRand%5==0 && bombCount !=bombMax)
		{
			cell = '<div class="cell" id="cell-'+i+j+'"><div class="bomb" id="bomb"></div></div>';
			bombCount++;
			boardMap[i][j] = 1;
		} 
		
		boardGame.innerHTML += cell;
	}
}

for (var i = 0; i < boardSize; i++) {
	for (var j = 0; j < boardSize; j++) {
		if(boardMap[i][j]!=1) {
			let number = numberCell(i,j);
			let cellBlock = document.getElementById('cell-'+i+j);
			cellBlock.innerHTML = `<span class="number ${number==0?"blank":"number-"+number}">${number==0?"":number}</span>`
		}
	}
}

function numberCell(x,y)
{
	let bombNumber = 0;
	if (typeof boardMap[x-1]!=='undefined' && boardMap[x-1][y]==1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x+1]!=='undefined' && boardMap[x+1][y]==1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x][y-1]!=='undefined' && boardMap[x][y-1]==1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x][y+1]!=='undefined' && boardMap[x][y+1]==1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x-1]!=='undefined' && boardMap[x-1][y-1]==1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x-1]!=='undefined' && boardMap[x-1][y+1]==1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x+1]!=='undefined' && boardMap[x+1][y-1]==1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x+1]!=='undefined' && boardMap[x+1][y+1]==1)
	{
		bombNumber++;
	}

	return bombNumber

}

let bombCells = document.getElementsByClassName('bomb');
Array.from(bombCells).forEach(function(element) {
	element.addEventListener('click', function(argument) {
		alert("BOOOOM");
		location.reload();
	});
});