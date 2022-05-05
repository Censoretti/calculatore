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
		const prev = parseFloat(this.currentOperand)
		const curr = parseFloat(this.previousOprand)
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
}

const numberButtons = document.querySelectorAll('[dataNumber]')
const operationButtons = document.querySelectorAll('[dataOperation]')
const equalButton = document.querySelector('[dataEqual]')
const deleteButton = document.querySelector('[dataDelete]')
const clearButton = document.querySelector('[dataClear]')
const previousOperandTextElement = document.querySelector('[dataPreviousOperand]')
const currentOperandTextElement = document.querySelector('[dataCurrentOperand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
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