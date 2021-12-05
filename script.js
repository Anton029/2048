document.addEventListener('DOMContentLoaded', () =>  {

const gridDisplay = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const resultDisplay = document.getElementById('result')
const looseGridToner = document.querySelector('.toner')
const restartGameButton = document.querySelector('.restart_button')
let gridSquares = []
const width = 4
let score = 0

//create the playing board
function createBoard() {
	for (let i = 0; i < width*width; i++) {
		square = document.createElement('div')
		square.innerHTML = 0
		gridDisplay.appendChild(square)
		gridSquares.push(square)
	}
	generate()
	generate()
}
createBoard()

//generate a new number
function generate() {
	randomNumber = Math.floor(Math.random() * gridSquares.length)
	if (gridSquares[randomNumber].innerHTML == 0) {
		gridSquares[randomNumber].innerHTML = 2
		checkForGameOver()
	} else generate()
}

function moveRight() {
	for (let i = 0; i < 16; i++) {
	  	if (i % 4 === 0) {
			let totalOne = gridSquares[i].innerHTML
			let totalTwo = gridSquares[i + 1].innerHTML
			let totalThree = gridSquares[i + 2].innerHTML
			let totalFour = gridSquares[i + 3].innerHTML
			let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

			let filteredRow = row.filter(num => num)
			let missing = 4 - filteredRow.length
			let zeros = Array(missing).fill(0)
			let newRow = zeros.concat(filteredRow)

			gridSquares[i].innerHTML = newRow[0]
			gridSquares[i + 1].innerHTML = newRow[1]
			gridSquares[i + 2].innerHTML = newRow[2]
			gridSquares[i + 3].innerHTML = newRow[3]
	  	}
	}
}

function moveLeft() {
	for (let i=0; i < 16; i++) {
		if (i % 4 === 0) {
			let totalOne = gridSquares[i].innerHTML
			let totalTwo = gridSquares[i+1].innerHTML
			let totalThree = gridSquares[i+2].innerHTML
			let totalFour = gridSquares[i+3].innerHTML
			let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

			let filteredRow = row.filter(num => num)
			let missing = 4 - filteredRow.length
			let zeros = Array(missing).fill(0)
			let newRow = filteredRow.concat(zeros)

			gridSquares[i].innerHTML = newRow[0]
			gridSquares[i +	1].innerHTML = newRow[1]
			gridSquares[i +	2].innerHTML = newRow[2]
			gridSquares[i +	3].innerHTML = newRow[3]
	  	}
	}
}

function moveUp() {
	for (let i = 0; i < 4; i++) {
		let totalOne = gridSquares[i].innerHTML
		let totalTwo = gridSquares[i+width].innerHTML
		let totalThree = gridSquares[i + (width * 2)].innerHTML
		let totalFour = gridSquares[i + (width * 3)].innerHTML
		let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

		let filteredColumn = column.filter(num => num)
		let missing = 4 - filteredColumn.length
		let zeros = Array(missing).fill(0)
		let newColumn = filteredColumn.concat(zeros)

		gridSquares[i].innerHTML = newColumn[0]
		gridSquares[i + width].innerHTML = newColumn[1]
		gridSquares[i + (width * 2)].innerHTML = newColumn[2]
		gridSquares[i + (width * 3)].innerHTML = newColumn[3]
	}
}

function moveDown() {
	for (let i = 0; i < 4; i++) {
		let totalOne = gridSquares[i].innerHTML
		let totalTwo = gridSquares[i + width].innerHTML
		let totalThree = gridSquares[i + (width * 2)].innerHTML
		let totalFour = gridSquares[i + (width * 3)].innerHTML
		let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

		let filteredColumn = column.filter(num => num)
		let missing = 4 - filteredColumn.length
		let zeros = Array(missing).fill(0)
		let newColumn = zeros.concat(filteredColumn)

		gridSquares[i].innerHTML = newColumn[0]
		gridSquares[i + width].innerHTML = newColumn[1]
		gridSquares[i + (width * 2)].innerHTML = newColumn[2]
		gridSquares[i + (width * 3)].innerHTML = newColumn[3]
	}
}

function combineRow() {
	for (let i = 0; i < 15; i++) {
		if (gridSquares[i].innerHTML === gridSquares[i + 1].innerHTML) {
			let combinedTotal = parseInt(gridSquares[i].innerHTML) + parseInt(gridSquares[i + 1].innerHTML)
			gridSquares[i].innerHTML = combinedTotal
			gridSquares[i + 1].innerHTML = 0
			// gridSquares[i + 1].style.color = '#EEE4DA'
			score += combinedTotal
			scoreDisplay.innerHTML = score
	  	}
	}
	checkForWin()
}

function combineColumn() {
	for (let i = 0; i < 12; i++) {
		if (gridSquares[i].innerHTML === gridSquares[i + width].innerHTML) {
		let combinedTotal = parseInt(gridSquares[i].innerHTML) + parseInt(gridSquares[i + width].innerHTML)
		gridSquares[i].innerHTML = combinedTotal
		gridSquares[i  +width].innerHTML = 0
		score += combinedTotal
		scoreDisplay.innerHTML = score
	  }
	}
	checkForWin()
}

//assign functions to keyCodes
function control(e) {
	if(e.keyCode === 37) {
		keyLeft()
	} else if (e.keyCode === 38) {
		keyUp()
	} else if (e.keyCode === 39) {
		keyRight()
	} else if (e.keyCode === 40) {
		keyDown()
	}
}

let startTouchXPos
let endTouchXPos
let startTouchYPos
let endTouchYPos
let scrollXLength
let scrollYLength

//touch screen control
function touchStart(event) {
	startTouchXPos = event.changedTouches[0].screenX
	startTouchYPos = event.changedTouches[0].screenY
}

window.addEventListener('touchstart', touchStart)

function touchEnd(event) {
	endTouchXPos = event.changedTouches[0].screenX
	endTouchYPos = event.changedTouches[0].screenY
	scrollXLength = Math.abs(startTouchXPos - endTouchXPos)
	scrollYLength = Math.abs(startTouchYPos - endTouchYPos)
	if(scrollXLength > 20 || scrollYLength > 10){
		if(scrollXLength > scrollYLength){
			if(endTouchXPos > startTouchXPos){
				moveRight()
				combineRow()
				moveRight()
				generate()
			} else {
				moveLeft()
				combineRow()
				moveLeft()
				generate()
			}
		}
		else if(scrollXLength < scrollYLength){
			if(endTouchYPos > startTouchYPos){
				moveDown()
				combineColumn()
				moveDown()
				generate()
			} else {
				moveUp()
				combineColumn()
				moveUp()
				generate()
			}
		}
	}
}

window.addEventListener('touchend', touchEnd)

document.addEventListener('keyup', control)

function keyRight() {
	moveRight()
	combineRow()
	moveRight()
	generate()
}

function keyLeft() {
	moveLeft()
	combineRow()
	moveLeft()
	generate()
}

function keyUp() {
	moveUp()
	combineColumn()
	moveUp()
	generate()
}

function keyDown() {
	moveDown()
	combineColumn()
	moveDown()
	generate()
}

//check for the number 2048 in the gridSquares to win
function checkForWin() {
	for (let i = 0; i < gridSquares.length; i++) {
		if (gridSquares[i].innerHTML == 2048) {
		resultDisplay.innerHTML = 'Вы выиграли'
		document.removeEventListener('keyup', control)
		setTimeout(() => clear(), 3000)
		}
	}
}

//check if there are no zeros on the board to lose
function checkForGameOver() {
	let zeros = 0
	for (let i = 0; i < gridSquares.length; i++) {
		if (gridSquares[i].innerHTML == 0) {
			zeros++
		}
	}
	if (zeros === 0) {
		resultDisplay.innerHTML = 'Вы проиграли'
		document.removeEventListener('keyup', control)
		window.removeEventListener('touchstart', touchStart)
		window.removeEventListener('touchend', touchEnd)
		setTimeout(() => clear(), 3000)
		looseGridToner.classList.add('active_toner')
	}
}

//clear timer
function clear() {
	clearInterval(myTimer)
}

//change colors
function addColours() {
	for (let i=0; i < gridSquares.length; i++) {
		if (gridSquares[i].innerHTML      == 0) gridSquares[i].style.cssText = `
																				background-color: #afa192;
																				color: #afa192
																				`
		else if (gridSquares[i].innerHTML == 2) gridSquares[i].style.cssText = `
																				background-color: #eee4da;
																				color: #afa192
																				`
		else if (gridSquares[i].innerHTML == 4) gridSquares[i].style.cssText = `
																				background-color: #ECE0C8;
																				color: #afa192
																				`
		else if (gridSquares[i].innerHTML == 8) gridSquares[i].style.cssText = `
																				background-color: #F2B179;
																				color: #FFFFFF
																				`
		else if (gridSquares[i].innerHTML == 16) gridSquares[i].style.cssText = `
																				background-color: #F59563;
																				color: #FFFFFF
																				`
		else if (gridSquares[i].innerHTML == 32) gridSquares[i].style.cssText = `
																				background-color: #F57C5F;
																				color: #FFFFFF
																				`
		else if (gridSquares[i].innerHTML == 64) gridSquares[i].style.cssText = `
																				background-color: #F65D3B;
																				color: #FFFFFF
																				` 
		else if (gridSquares[i].innerHTML == 128) gridSquares[i].style.cssText = `
																				background-color: #EFCA71;
																				color: #FFFFFF
																				` 
		else if (gridSquares[i].innerHTML == 256) gridSquares[i].style.cssText = `
																				background-color: #EEC85D;
																				color: #FFFFFF
																				`
		else if (gridSquares[i].innerHTML == 512) gridSquares[i].style.cssText = `
																				background-color: #F1C34B;
																				color: #FFFFFF
																				`
		else if (gridSquares[i].innerHTML == 1024) gridSquares[i].style.cssText = `
																				background-color: #F1BF38;
																				color: #FFFFFF
																				`
		else if (gridSquares[i].innerHTML == 2048) gridSquares[i].style.cssText = `
																				background-color: #DBB33B;
																				color: #FFFFFF
																				`
	}
}
addColours()

let myTimer = setInterval(addColours, 50)

restartGameButton.addEventListener('click', () => {

	restartGameButton.classList.add('restart_button_clicked')
	setTimeout(() => {
		restartGameButton.classList.remove('restart_button_clicked')
	}, 300)

	resultDisplay.innerHTML = 'Играйте и доберитесь до <strong>2048</strong>'

	score = 0
	gridSquares = []

	scoreDisplay.innerHTML = score
	
	looseGridToner.classList.remove('active_toner')

	gridDisplay.innerHTML = ''

	createBoard()
	addColours()

	myTimer = setInterval(addColours, 50)

	document.addEventListener('keyup', control)
	window.addEventListener('touchstart', touchStart)
	window.addEventListener('touchend', touchEnd)
})

})