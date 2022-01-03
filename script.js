document.addEventListener('DOMContentLoaded', () =>  {

const gridDisplay = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const resultDisplay = document.getElementById('result')
const looseGridToner = document.querySelector('.toner')
const restartGameButton = document.querySelector('.restart_button')
const ratingButton = document.querySelector('.rating_button')
const ratingIcon = document.querySelector('.rating_icon')
const ratingList = document.querySelector('.rating_list')
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
window.addEventListener('touchstart', touchStart)
function touchStart(event) {
	startTouchXPos = event.changedTouches[0].screenX
	startTouchYPos = event.changedTouches[0].screenY
}

window.addEventListener('touchend', touchEnd)
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


//terminal
document.addEventListener('mousedown', clickStart)
function clickStart(event) {
	startTouchXPos = event.clientX
	startTouchYPos = event.clientY
}

document.addEventListener('mouseup', clickEnd)
function clickEnd(event) {
	endTouchXPos = event.clientX
	endTouchYPos = event.clientY
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

// check for the number 2048 in the gridSquares to win
function checkForWin() {
	if(resultDisplay.innerHTML != 'Вы добрались до <strong>2048</strong>'){
		for (let i = 0; i < gridSquares.length; i++) {
			if (gridSquares[i].innerHTML == 2048) {
				resultDisplay.innerHTML = 'Вы добрались до <strong>2048</strong>'
			}
		}
	}
}

let globalGameLock = false

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
		document.removeEventListener('mousedown', clickStart)
		document.removeEventListener('mouseup', clickEnd)
		setTimeout(() => clear(), 3000)
		looseGridToner.classList.add('active_toner')
		setTimeout(() => {
			losePopup.classList.add('floatup_popup')
			globalGameLock = true
		}, 150)
	}
}

//clear timer
function clear() {
	clearInterval(myTimer)
}

//change colors
function addColours() {
	for (let i=0; i < gridSquares.length; i++) {
		if (gridSquares[i].innerHTML      == 0) gridSquares[i].style.cssText = 		`
																					background-color: #afa192;
																					color: #afa192
																					`
		else if (gridSquares[i].innerHTML == 2) gridSquares[i].style.cssText = 		`
																					background-color: #eee4da;
																					color: #afa192
																					`
		else if (gridSquares[i].innerHTML == 4) gridSquares[i].style.cssText = 		`
																					background-color: #ECE0C8;
																					color: #afa192
																					`
		else if (gridSquares[i].innerHTML == 8) gridSquares[i].style.cssText = 		`
																					background-color: #F2B179;
																					color: #FFFFFF
																					`
		else if (gridSquares[i].innerHTML == 16) gridSquares[i].style.cssText = 	`
																					background-color: #F59563;
																					color: #FFFFFF
																					`
		else if (gridSquares[i].innerHTML == 32) gridSquares[i].style.cssText = 	`
																					background-color: #F57C5F;
																					color: #FFFFFF
																					`
		else if (gridSquares[i].innerHTML == 64) gridSquares[i].style.cssText = 	`
																					background-color: #F65D3B;
																					color: #FFFFFF
																					` 
		else if (gridSquares[i].innerHTML == 128) gridSquares[i].style.cssText = 	`
																					background-color: #EFCA71;
																					color: #FFFFFF
																					` 
		else if (gridSquares[i].innerHTML == 256) gridSquares[i].style.cssText = 	`
																					background-color: #EEC85D;
																					color: #FFFFFF
																					`
		else if (gridSquares[i].innerHTML == 512) gridSquares[i].style.cssText = 	`
																					background-color: #F1C34B;
																					color: #FFFFFF
																					`
		else if (gridSquares[i].innerHTML == 1024) gridSquares[i].style.cssText = 	`
																					background-color: #F1BF38;
																					color: #FFFFFF
																					`
		else if (gridSquares[i].innerHTML >= 2048) gridSquares[i].style.cssText = 	`
																					background-color: #DBB33B;
																					color: #FFFFFF
																					`
	}
}
addColours()

let myTimer = setInterval(addColours, 50)

ratingButton.addEventListener('click', () => {
	setTimeout(() => {
		if(ratingIcon.classList.contains('rating_icon_active')
			&& ratingList.classList.contains('rating_list_active')
		){
			ratingIcon.classList.remove('rating_icon_active')
			ratingList.classList.remove('rating_list_active')
		} else {
			ratingIcon.classList.add('rating_icon_active')
			ratingList.classList.add('rating_list_active')
		}
	}, 150)
})

ratingList.addEventListener('touchstart', () => {
	window.removeEventListener('touchstart', touchStart)
	window.removeEventListener('touchend', touchEnd)
	document.removeEventListener('mousedown', clickStart)
	document.removeEventListener('mouseup', clickEnd)
	document.removeEventListener('touchstart', windowScroll)
})

ratingList.addEventListener('touchend', () => {
	document.addEventListener('touchstart', windowScroll)
})

let sortLocalStorage = []

function updateLocalStorage() {
	sortLocalStorage = []
	for(key in localStorage) {
		if(
			key != 'length' && 
			key != 'clear' && 
			key != 'getItem' && 
			key != 'key' && 
			key != 'removeItem' && 
			key != 'setItem'
		){
			sortLocalStorage.push([key, localStorage[key]])
			sortLocalStorage.sort((a, b) => b[1] - a[1])
		}
	}
}

updateLocalStorage()

function buildRatingList(dataArray){
	if(sortLocalStorage.length == 0){
		ratingList.innerHTML = '<div class="empty_list_text">Пока что рейтинг пустой</div>'
		return true
	} else ratingList.innerHTML = ''
	
	let leadersCounter = 0
	dataArray.forEach(el => {
		++leadersCounter

		const listItemWrapper = document.createElement('div')
		listItemWrapper.className = 'list_item'

		const itemTltle = document.createElement('div')
		itemTltle.className = 'item_tltle'
		itemTltle.innerHTML = `<span class="rating_position">${leadersCounter}. ${el[0]}</span>`
		listItemWrapper.append(itemTltle)
		
		const itemScore = document.createElement('div')
		itemScore.className = 'item_score'
		itemScore.innerHTML = `${el[1]}`
		listItemWrapper.append(itemScore)

		ratingList.append(listItemWrapper)
	})
}

buildRatingList(sortLocalStorage)

//unlock game controls
function windowScroll() {
	window.addEventListener('touchstart', touchStart)
	window.addEventListener('touchend', touchEnd)
	document.addEventListener('mousedown', clickStart)
	document.addEventListener('mouseup', clickEnd)
}

//restart game
restartGameButton.addEventListener('click', () => {

	restartGameButton.classList.add('restart_button_clicked')
	setTimeout(() => {
		restartGameButton.classList.remove('restart_button_clicked')
	}, 300)

	setTimeout(() => {
		losePopup.classList.remove('floatup_popup')
	}, 150)
	

	resultDisplay.innerHTML = 'Играйте и доберитесь до <strong>2048</strong>'

	score = 0
	gridSquares = []

	scoreDisplay.innerHTML = score
	looseGridToner.classList.remove('active_toner')
	globalGameLock = false
	gridDisplay.innerHTML = ''

	createBoard()
	addColours()

	myTimer = setInterval(addColours, 50)

	document.addEventListener('keyup', control)
	window.addEventListener('touchstart', touchStart)
	window.addEventListener('touchend', touchEnd)
	document.addEventListener('mousedown', clickStart)
	document.addEventListener('mouseup', clickEnd)
})

const losePopup = document.querySelector('.lose_popup_message')
const cancelRecordSave = document.querySelector('.lose_popup_message .cancel_button')
const confirmRecordSave = document.querySelector('.lose_popup_message .save_button')
const nicknamePopup = document.querySelector('.nickname_input_wrapper')
const virtualKeyBoard = document.querySelector('.virtual_keyboard')
const enterToRecord = document.querySelectorAll('.nickname_input_wrapper .enter, .virtual_keyboard .enter_button')

nicknamePopup.addEventListener('mousedown', () => {
	window.removeEventListener('touchstart', touchStart)
	window.removeEventListener('touchend', touchEnd)
	document.removeEventListener('mousedown', clickStart)
	document.removeEventListener('mouseup', clickEnd)
	document.removeEventListener('touchstart', windowScroll)
})

nicknamePopup.addEventListener('mouseup', () => {
	if(!globalGameLock){
		document.addEventListener('touchstart', windowScroll)
	}
})

nicknamePopup.addEventListener('touchstart', () => {
	window.removeEventListener('touchstart', touchStart)
	window.removeEventListener('touchend', touchEnd)
	document.removeEventListener('mousedown', clickStart)
	document.removeEventListener('mouseup', clickEnd)
	document.removeEventListener('touchstart', windowScroll)
})

nicknamePopup.addEventListener('touchend', () => {
	if(!globalGameLock){
		document.addEventListener('touchstart', windowScroll)
	}
})



virtualKeyBoard.addEventListener('mousedown', () => {
	window.removeEventListener('touchstart', touchStart)
	window.removeEventListener('touchend', touchEnd)
	document.removeEventListener('mousedown', clickStart)
	document.removeEventListener('mouseup', clickEnd)
	document.removeEventListener('touchstart', windowScroll)
})

virtualKeyBoard.addEventListener('mouseup', () => {
	if(!globalGameLock){
		document.addEventListener('touchstart', windowScroll)
	}
})

virtualKeyBoard.addEventListener('touchstart', () => {
	window.removeEventListener('touchstart', touchStart)
	window.removeEventListener('touchend', touchEnd)
	document.removeEventListener('mousedown', clickStart)
	document.removeEventListener('mouseup', clickEnd)
	document.removeEventListener('touchstart', windowScroll)
})

virtualKeyBoard.addEventListener('touchend', () => {
	if(!globalGameLock){
		document.addEventListener('touchstart', windowScroll)
	}
})

const nicknameInput = document.getElementById('nickname_input')

confirmRecordSave.addEventListener('click', () => {
	setTimeout(() => {
		losePopup.classList.remove('floatup_popup')
		nicknamePopup.classList.add('floatup_popup')
		virtualKeyBoard.classList.add('floatup_popup')
		nicknameInput.focus()
	}, 150)
})

cancelRecordSave.addEventListener('click', () => {
	setTimeout(() => {
		losePopup.classList.remove('floatup_popup')
	}, 150)
})

let buttonLock = false

enterToRecord.forEach(e => 
	e.addEventListener('click', () => {
		if(buttonLock === false){
			buttonLock = true
			setTimeout(() => {
				nicknamePopup.classList.remove('floatup_popup')
				virtualKeyBoard.classList.remove('floatup_popup')
				const nickname = nicknamePopup.querySelector('input').value
				
				const checkStorageRating = localStorage.getItem(`${nickname}`)
	
				if(checkStorageRating){
					if(Number(score) > Number(checkStorageRating)){
						localStorage.setItem(`${nickname}`, `${score}`)
						updateLocalStorage()
						buildRatingList(sortLocalStorage)
					}
	
				} else {
					localStorage.setItem(`${nickname}`, `${score}`)
					updateLocalStorage()
					buildRatingList(sortLocalStorage)
				}
		
				setTimeout(() => {
					nicknamePopup.querySelector('input').value = ''
		
					window.addEventListener('touchstart', touchStart)
					window.addEventListener('touchend', touchEnd)
					document.addEventListener('mousedown', clickStart)
					document.addEventListener('mouseup', clickEnd)
					document.addEventListener('touchstart', windowScroll)
				}, 150)
	
			}, 150)
	
			setTimeout(() => {
				buttonLock = false
			}, 500)

			nicknameInput.blur()
		}
	})
)

})