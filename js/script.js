const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
// const operationButtons = document.querySelectorAll('[data-operation]');
// const numberButtons = document.querySelectorAll('[data-number]');
const mathButtons = document.querySelectorAll('[data-operation], [data-number]');
const equalsButton = document.querySelector('[data-equals]');
let calculationMemory = previousOperand.textContent;

allClearButton.addEventListener('click', () => {
  previousOperand.textContent = ''
  currentOperand.textContent = ''
  calculationMemory = ''
})
deleteButton.addEventListener('click', () => {
  calculationMemory = calculationMemory.slice(0, -1)
  logToCurrent()
})
mathButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculationMemory += `${button.textContent}`
  logToCurrent()
  })
})
equalsButton.addEventListener('click', () => {
  let expression = calculationMemory.replaceAll('√', '**(1/2)').replaceAll('^', '**').replaceAll('×', '*').replaceAll('÷', '/')
  let result = eval(expression) 
  previousOperand.textContent = calculationMemory
  currentOperand.textContent = result
  calculationMemory =  result.toString()
})
function logToCurrent() {
  currentOperand.textContent = calculationMemory.replaceAll('**', '^')
}