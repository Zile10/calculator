const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const exponentButton = document.querySelector('[data-exponent]');
const equalsButton = document.querySelector('[data-equals]');
let calculationMemory = previousOperand.textContent;

allClearButton.addEventListener('click', () => {
  previousOperand.textContent = ''
  currentOperand.textContent = ''
  calculationMemory = ''
})
deleteButton.addEventListener('click', () => {
  calculationMemory = calculationMemory.slice(0, -1)
  currentOperand.textContent = calculationMemory
})
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculationMemory += `${button.textContent}`
    currentOperand.textContent = calculationMemory
  })
})
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculationMemory += `${button.textContent}`
    currentOperand.textContent = calculationMemory
  })
})
exponentButton.addEventListener('click', () => {
  calculationMemory += `**`
  currentOperand.textContent = calculationMemory
})
equalsButton.addEventListener('click', () => {
  previousOperand.textContent = calculationMemory
  currentOperand.textContent = eval(calculationMemory)
  calculationMemory =  eval(calculationMemory).toString()
})