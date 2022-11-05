// GAME LOGIC
let boardGame = document.getElementById('board-game');
let boardSize = 9;
let bombRand = Math.floor(Math.random() * 100) + 1;
let cell = '<div class="cell"></div>';
let bombCount = 0;
let bombMax = 10;
let boardMap = [];
let zone=0;

boardGame.style.width = boardSize+'50px';
boardGame.style.height = boardSize+'50px';

/**
 * Fill the board randomly with the maximum bombs number
 */
for (var i = 0; i < boardSize; i++) {
	boardMap[i]=[];
	for (var j = 0; j < boardSize; j++) {
		bombRand = Math.floor(Math.random() * 100) + 1;
		cell = '<div class="cell" id="cell-'+i+j+'" data-cellX='+i+' data-cellY='+j+'></div>';
		boardMap[i][j] = 0;
		if(bombRand%5==0 && bombCount !=bombMax)
		{
			//cell = '<div class="cell" id="cell-'+i+j+'"><div class="bomb" id="bomb"></div></div>';
			bombCount++;
			boardMap[i][j]=-1;
		} 
		
		boardGame.innerHTML += cell;
	}
}

/**
 * Arrange the numbers beside the bombs
 */
for (var i = 0; i < boardSize; i++) {
	for (var j = 0; j < boardSize; j++) {
		if(boardMap[i][j]!=-1) {
			let number = numberCell(i,j);
			//let cellBlock = document.getElementById('cell-'+i+j);
			//cellBlock.innerHTML = `<span class="number ${number==0?"blank":"number-"+number}">${number==0?"":number}</span>`;
			boardMap[i][j]=number
		}
	}
}

for (var i = 0; i < boardSize; i++) {
	for (var j = 0; j < boardSize; j++) {
		if(boardMap[i][j]==0)
		{
			boardMap[i][j]=zoneCell(i,j);
		}
	}
}

function numberCell(x,y)
{
	let bombNumber = 0;
	if (typeof boardMap[x-1]!=='undefined' && boardMap[x-1][y]==-1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x+1]!=='undefined' && boardMap[x+1][y]==-1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x][y-1]!=='undefined' && boardMap[x][y-1]==-1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x][y+1]!=='undefined' && boardMap[x][y+1]==-1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x-1]!=='undefined' && boardMap[x-1][y-1]==-1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x-1]!=='undefined' && boardMap[x-1][y+1]==-1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x+1]!=='undefined' && boardMap[x+1][y-1]==-1)
	{
		bombNumber++;
	}
	if (typeof boardMap[x+1]!=='undefined' && boardMap[x+1][y+1]==-1)
	{
		bombNumber++;
	}

	return bombNumber
}

function zoneCell(x,y)
{
	theZone = "";
	if (typeof boardMap[x-1]!=='undefined' && isNaN(boardMap[x-1][y]))
	{
		theZone = boardMap[x-1][y];
	}
	if (typeof boardMap[x+1]!=='undefined' && typeof boardMap[x+1][y]!=='undefined' && isNaN(boardMap[x+1][y]))
	{
		theZone = boardMap[x+1][y];
	}
	if (typeof boardMap[x][y-1]!=='undefined' && isNaN(boardMap[x][y-1]))
	{
		theZone = boardMap[x][y-1];
	}
	if (typeof boardMap[x][y+1]!=='undefined' && isNaN(boardMap[x][y+1]))
	{
		theZone = boardMap[x][y+1];
	}
	if (typeof boardMap[x-1] !=='undefined' && typeof boardMap[x-1][y-1]!=='undefined' && isNaN(boardMap[x-1][y-1]))
	{
		theZone = boardMap[x-1][y-1];
	}
	if (typeof boardMap[x-1]!=='undefined' && typeof boardMap[x-1][y+1]!=='undefined' && isNaN(boardMap[x-1][y+1]))
	{
		theZone = boardMap[x-1][y+1];
	}
	if (typeof boardMap[x+1]!=='undefined' && typeof boardMap[x+1][y-1]!=='undefined' && isNaN(boardMap[x+1][y-1]))
	{
		theZone = boardMap[x+1][y-1];
	}
	if (typeof boardMap[x+1]!=='undefined' && typeof boardMap[x+1][y+1]!=='undefined' && isNaN(boardMap[x+1][y+1]))
	{
		theZone = boardMap[x+1][y+1];
	}

	if(theZone == "")
	{
		zone++;
		return 'Z'+zone;
	}
	return theZone;
}

console.log(boardMap);

// let bombCells = document.getElementsByClassName('bomb');
// Array.from(bombCells).forEach(function(element) {
// 	element.addEventListener('click', function(argument) {
// 		alert("BOOOOM");
// 		location.reload();
// 	});
// });
// 

const cells = document.getElementsByClassName('cell');
Array.from(cells).forEach((c)=>{
	c.addEventListener('click',function(){
		if(this.classList.contains('active')){
			return null;
		}
		const x = this.getAttribute('data-cellX');
		const y = this.getAttribute('data-cellY');
		const boardData = boardMap[x][y];

		this.classList.add('active');

		if(boardData == -1)
		{
			this.innerHTML = '<div class="bomb" id="bomb"></div>';
			alert("BOOOOM");
			location.reload();
			
		}else if(!isNaN(boardData)) {
			this.innerHTML = `<span class="number number-${boardData}">${boardData}</span>`;
		} else 
		{
			for (var i = 0; i < boardSize; i++) {
				for (var j = 0; j < boardSize; j++) {
					if(boardMap[i][j] == boardData)
					{
						const cellData = document.getElementById('cell-'+i+j);
						cellData.classList.add('active');
					}
				}
			}
		}
	})
})
