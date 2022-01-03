const englishKeyboardTemplate = [
	[ "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P" ],
  	[ "A", "S", "D", "F", "G", "H", "J", "K", "L" ],
  	[ "Z", "X", "C", "V", "B", "N", "M" ]
]

const russianKeyboardTemplate = [
	[ "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ" ],
	[ "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"	],
	[ "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Ё" ]
]

const capsLkButton = document.querySelector('.capsLk_button')

let registerNow = 'upper'

function changeKeyboardRegister() {
	const keyboardLetters = document.querySelectorAll('.virtual_keyboard .letter')

	if(registerNow === 'upper'){
		keyboardLetters.forEach(e => {
			e.innerHTML = e.innerHTML.toLowerCase()
		})
		registerNow = 'down'
	}

	else if(registerNow === 'down'){
		keyboardLetters.forEach(e => {
			e.innerHTML = e.innerHTML.toUpperCase()
		})
		registerNow = 'upper'
	}
}

capsLkButton.addEventListener('click', () => {
	changeKeyboardRegister()
})

const lettersRowWrapper = document.querySelector(".letters_row_wrapper")

let langNow = "eng";

function createBoard(lang) {

	lettersRowWrapper.innerHTML = ""

	if(lang === "rus"){
		russianKeyboardTemplate.forEach(e => {
			const lettersRow = document.createElement("div")
			lettersRow.className = "letters_row"
			e.forEach(item => {
				const letter = document.createElement("div")
				letter.className = "letter"
				letter.innerHTML = item
				lettersRow.append(letter)
			})
			lettersRowWrapper.append(lettersRow)
		})
	}
	
	else if(lang === "eng"){
		englishKeyboardTemplate.forEach(e => {
			const lettersRow = document.createElement("div")
			lettersRow.className = "letters_row"
			e.forEach(item => {
				const letter = document.createElement("div")
				letter.className = "letter"
				letter.innerHTML = item
				lettersRow.append(letter)
			})
			lettersRowWrapper.append(lettersRow)
		})
	}

	const keyboardLetters = document.querySelectorAll('.virtual_keyboard .letter')

	if(registerNow === 'upper'){
		keyboardLetters.forEach(e => {
			e.innerHTML = e.innerHTML.toUpperCase()
		})
	}

	else if(registerNow === 'down'){
		keyboardLetters.forEach(e => {
			e.innerHTML = e.innerHTML.toLowerCase()
		})
	}
}

createBoard(langNow)

let keyboardAllButtons = document.querySelectorAll('.numbers_row .number_button, .letters_row_wrapper .letter, .other_keys_row div')
let keyboardNameInputButtons = document.querySelectorAll('.numbers_row .number_button, .letters_row_wrapper .letter, .other_keys_row .space_button')
const keyboardNameInput = document.querySelector('#nickname_input')
const deleteButton = document.querySelector('.delete_button')

keyboardAllButtons.forEach(e => {
	e.addEventListener('click', () => {
		e.classList.add('keyboard_buttons_clicked')
		setTimeout(() => {
			e.classList.remove('keyboard_buttons_clicked')
		}, 200)
	})
})

keyboardNameInputButtons.forEach(e => {
    e.addEventListener('click', () => {
        keyboardNameInput.value += e.innerHTML
    })
})

deleteButton.addEventListener('click', () => {
    keyboardNameInput.value = keyboardNameInput.value.slice(0, -1)
})

let deleteInterval

deleteButton.addEventListener('mousedown', () => {
    deleteInterval = setInterval(() => {
        keyboardNameInput.value = keyboardNameInput.value.slice(0, -1)
    }, 300);
})
deleteButton.addEventListener('mouseup', () => {
    clearInterval(deleteInterval)
})

deleteButton.addEventListener('touchstart', () => {
    deleteInterval = setInterval(() => {
        keyboardNameInput.value = keyboardNameInput.value.slice(0, -1)
    }, 200);
})
deleteButton.addEventListener('touchend', () => {
    clearInterval(deleteInterval)
})

const changeKeyboardLangButton = document.querySelector('.change_language_button')

changeKeyboardLangButton.addEventListener('click', () => {
    if(langNow === "rus"){
        langNow = "eng"
    }
    else if(langNow === "eng"){
        langNow = "rus"
    }
    createBoard(langNow)

    keyboardAllButtons = document.querySelectorAll('.numbers_row .number_button, .letters_row_wrapper .letter, .other_keys_row div')
    keyboardAllButtons.forEach(e => {
        e.addEventListener('click', () => {
            e.classList.add('keyboard_buttons_clicked')
            setTimeout(() => {
                e.classList.remove('keyboard_buttons_clicked')
            }, 150)
        })
    })

    keyboardNameInputButtons = document.querySelectorAll('.letters_row_wrapper .letter')
    keyboardNameInputButtons.forEach(e => {
        e.addEventListener('click', () => {
            keyboardNameInput.value += e.innerHTML
        })
    })
})