// Grabbing Current/Previous operand displays from the DOM
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
// Grabbing Buttons from the DOM
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const mathButtons = document.querySelectorAll('[data-operation], [data-number]');
const equalsButton = document.querySelector('[data-equals]');
// Creating Calculation memory variable, which will have the value of the previous calculation by default
let calculationMemory = previousOperand.textContent;

// Clearing 2 Displays and the memory when 'AC' button clicked
allClearButton.addEventListener('click', () => {
  previousOperand.textContent = ''
  currentOperand.textContent = ''
  calculationMemory = ''
})
// Removes last character from memory string then updating the display when clicking 'Delete'
deleteButton.addEventListener('click', () => {
  calculationMemory = calculationMemory.slice(0, -1)
  logToCurrent()
})
//For each number/operation button, add an event listener, so that when clicked, it adds its symbol/number to the memory string, and updates 'current' display
mathButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculationMemory += `${button.textContent}`
    logToCurrent()
  })
})

equalsButton.addEventListener('click', () => {
  // Replace all Special Characters in memory string, with characters that JS can calculate with.
  let expression = calculationMemory.replaceAll('√', '**(1/2)').replaceAll('^', '**').replaceAll('×', '*').replaceAll('÷', '/')
  // Evaluating the expression from the memory
  let result = eval(expression) 
  // Setting precious operation on the display to the current operand
  previousOperand.textContent = currentOperand.textContent
  // Changing current Operand on display to the result of the calculation, and saving it to the memory
  currentOperand.textContent = result
  calculationMemory =  result.toString()
})
//Updates Current Operand Display
function logToCurrent() {
  currentOperand.textContent = calculationMemory.replaceAll('××', '^').replaceAll('√', '^(1/2)')
}