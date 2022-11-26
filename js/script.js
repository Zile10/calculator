// Grabbing Current/Previous operand displays from the DOM
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
// Grabbing Buttons from the DOM
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const decimal = document.querySelector('[data-decimal]')
const equalsButton = document.querySelector('[data-equals]');

let calculationMemory = previousOperand.textContent;
let decimalAllowed = true;
let squareRootCounter = 0

// Clearing 2 Displays and the memory when 'AC' button clicked
allClearButton.addEventListener('click', () => {
  previousOperand.textContent = ''
  currentOperand.textContent = ''
  calculationMemory = ''
  decimalAllowed = true
  squareRootCounter = 0
})
// Removes last character from memory string then updating the display when clicking 'Delete'
deleteButton.addEventListener('click', () => {
  if (calculationMemory[calculationMemory.length-1] == '.') {
    decimalAllowed = true
  } else if (calculationMemory[calculationMemory.length-1] == '√') {
    squareRootCounter--
  }
  calculationMemory = calculationMemory.slice(0, -1)
  logToCurrent()
})
//For each number/operation button, add an event listener, so that when clicked, it adds its symbol/number to the memory string, and updates 'current' display
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculationMemory += `${button.textContent}`
    logToCurrent()
  })
})
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.textContent == '√') {
      calculationMemory += '√('
      squareRootCounter++
    } else if (squareRootCounter>0 && button.textContent == ')') {
      calculationMemory += '_'
      squareRootCounter--
    } else {
      calculationMemory += `${button.textContent}`
    }
      logToCurrent()
      decimalAllowed = true
  })
})

decimal.addEventListener('click', () => {
  if (decimalAllowed ) {
    calculationMemory += `${decimal.textContent}`
    logToCurrent()
    decimalAllowed = false
  }
})

equalsButton.addEventListener('click', () => {
  // Replace all Special Characters in memory string, with characters that JS can calculate with.
  let expression = calculationMemory.replaceAll('√', '').replaceAll('^', '**').replaceAll('×', '*').replaceAll('÷', '/').replaceAll('_', ')**(1/2)')
  // Evaluating the expression from the memory
  try {
    let result = JSON.stringify(eval(expression))
    if (result.includes('.')) {
      decimalAllowed = false
    } else decimalAllowed = true

    // Setting precious operation on the display to the current operand
    previousOperand.textContent = currentOperand.textContent
    // Changing current Operand on display to the result of the calculation, and saving it to the memory
    if (result == 'null') {
      currentOperand.textContent = "ERROR: CAN'T DIVIDE BY ZERO"
    } else {
      currentOperand.textContent = result
      calculationMemory =  result
    }

  } catch (e){
    console.log(e);
    previousOperand.textContent = currentOperand.textContent
    currentOperand.textContent = 'ERROR: INVALID SYNTAX'
  }
  squareRootCounter = 0
})
//Updates Current Operand Display
function logToCurrent() {
  currentOperand.textContent = calculationMemory.replaceAll('××', '^').replaceAll('_', ')')
}