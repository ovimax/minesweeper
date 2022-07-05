// GAME LOGIC
let boardGame = document.getElementById('board-game');
let boardSize = 9;
let bombRand = Math.floor(Math.random() * 100) + 1;
let cell = '<div class="cell"></div>';
let bombCount = 0;
let bombMax = 10;

boardGame.style.width = boardSize+'50px';
boardGame.style.height = boardSize+'50px';

for (var i = 0; i < boardSize; i++) {
	for (var j = 0; j < boardSize; j++) {
		bombRand = Math.floor(Math.random() * 100) + 1 + i + j;
		console.log(i,j)
		cell = '<div class="cell">'+ i+j +'</div>';
		if(bombRand%5==0 && bombCount !=bombMax)
		{
			cell = '<div class="cell"><div class="bomb">'+ i+j +'</div></div>';
			bombCount++;
		} 
		
		boardGame.innerHTML += cell;
	}
}

