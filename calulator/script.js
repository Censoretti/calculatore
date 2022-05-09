class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	clear() {
		this.currentOperand = ''
		this.previousOprand = ''
		this.operation = undefined
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}

	appendNumber(number) {
		if(number === '.' && this.currentOperand.includes('.')) return
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	chooseOperation(operation) {
		if(this.currentOperand === '') return
		if(this.previousOprand !== '') this.compute()
		this.operation = operation
		this.previousOprand = this.currentOperand
		this.currentOperand = ''
	}

	compute() {
		let result
		const curr = parseFloat(this.currentOperand)
		const prev = parseFloat(this.previousOprand)
		if (isNaN(prev) || isNaN(curr)) return
		switch (this.operation) {
			case '+':
				result = prev + curr
				break
			case '*':
				result = prev * curr
				break
			case '/':
				result = prev / curr
				break
			case '-':
				result = prev - curr
				break
			case '%':
				result = prev % curr
				break
			case '^':
				result = prev ** curr
				break
			default:
				return
		}
		this.currentOperand = result
		this.operation = undefined
		this.previousOprand = ''
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		
		if(isNaN(integerDigits)){
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
		}
		
		if(decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}

	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
		if(this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOprand)} ${this.operation}`
		} else {
			this.previousOperandTextElement.innerText = ''
		}
	}

	changeSign() {
		let placeholder = this.getDisplayNumber(this.currentOperand)
		if(isNaN(placeholder)) return
		this.currentOperand = placeholder * (-1)
	}

	squareCalc() {
		if(this.currentOperand === '') return
		if(this.previousOprand !== '') {
			this.compute()
			this.previousOperandTextElement.innerText = ''
		}
		this.currentOperand = Math.sqrt(this.currentOperand)
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
	}

	registerNumber() {
		if(registredNumber === undefined) {
			if(this.currentOperand === '') return
			if(this.previousOprand !== '') this.compute()
			registredNumber = this.currentOperand
			this.currentOperand = ''
			this.previousOprand = ''
			registerButton.style.setProperty('background-color', 'rgb(0, 255, 0, .3)')
		} else {
			this.currentOperand = registredNumber
			registredNumber = undefined
		}
	}
}

const numberButtons = document.querySelectorAll('[dataNumber]')
const operationButtons = document.querySelectorAll('[dataOperation]')
const hiddenButons = document.querySelectorAll('.hidden')

const equalButton = document.querySelector('[dataEqual]')
const deleteButton = document.querySelector('[dataDelete]')
const clearButton = document.querySelector('[dataClear]')
const previousOperandTextElement = document.querySelector('[dataPreviousOperand]')
const currentOperandTextElement = document.querySelector('[dataCurrentOperand]')
const changeSignButton = document.querySelector('[dataChangeSign]')
const gearButton = document.querySelector('[dataGear]')
const gridOptions = document.querySelector('[dataGridOptions]')
const squareButton = document.querySelector('[dataSquare]')
const registerButton = document.querySelector('[dataRegister]')
const meButton = document.querySelector('[dataME]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.value)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.value)
		calculator.updateDisplay()
	})
})

equalButton.addEventListener('click', () => {
	calculator.compute()
	calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
	calculator.delete()
	calculator.updateDisplay()
})

changeSignButton.addEventListener('click', () => {
	calculator.changeSign()
	calculator.updateDisplay()
})

let gridChange = false
gearButton.addEventListener('click', () => {
	if(gridChange) {
		gridOptions.style.setProperty('grid-template-columns', 'repeat(4, 100px)')
		gridChange = false
		hiddenButons.forEach(element => element.toggleAttribute("hidden"))
		gearButton.innerText = '>'
	} else {
		gridOptions.style.setProperty('grid-template-columns', 'repeat(5, 100px)')
		gridChange = true
		hiddenButons.forEach(element => element.toggleAttribute("hidden"))
		gearButton.innerText = '<'
	}
})

squareButton.addEventListener('click', () => {
	calculator.squareCalc()
})

let registredNumber
registerButton.addEventListener('click', () => {
	calculator.registerNumber()
	calculator.updateDisplay()
})

meButton.addEventListener('click', () => {
		alert('https://www.linkedin.com/in/rodrigopaiotti/')
})