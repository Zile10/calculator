// 'Buttons and Displays' variables
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const operationBtns = document.querySelectorAll('[data-operation]');
const numberBtns = document.querySelectorAll('[data-number]');
const decimal = document.querySelector('[data-decimal]')
const equalsBtn = document.querySelector('[data-equals]');
// Memory Variables
let calculationMemory = previousOperand.textContent;
let decimalAllowed = true;
let squareRootCounter = 0

// Reset All values when AC is clicked
allClearBtn.addEventListener('click', () => {
  previousOperand.textContent = ''
  currentOperand.textContent = ''
  calculationMemory = ''
  decimalAllowed = true
  squareRootCounter = 0
})

deleteBtn.addEventListener('click', () => {
  // Accounting for Decimal and Square Root
  if (calculationMemory[calculationMemory.length-1] == '.') {
    decimalAllowed = true
  } else if (calculationMemory[calculationMemory.length-1] == '√') {
    squareRootCounter--
  }
  // Deletes last character
  calculationMemory = calculationMemory.slice(0, -1)
  logToCurrent()
})

// Add Numbers to Memory & Display when numbers clicked
numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculationMemory += `${btn.textContent}`
    logToCurrent()
  })
})

operationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // When '√' clicked, it will be treating differently in Memory on display. Since Bracket is used, Closing bracket will be treated differntly as well. Using '_' symbol as a placeholder to later replace/edit for functionality purposes.
    if (btn.textContent == '√') {
      calculationMemory += '√('
      squareRootCounter++
    } else if (squareRootCounter>0 && btn.textContent == ')') {
      calculationMemory += '_'
      squareRootCounter--
    } else {
      calculationMemory += `${btn.textContent}`
    }
      logToCurrent()
      decimalAllowed = true
  })
})

decimal.addEventListener('click', () => {
  // Only allow decimal if conditions are met, e.g. if it has not been used in current number already
  if (decimalAllowed) {
    calculationMemory += `${decimal.textContent}`
    logToCurrent()
    decimalAllowed = false
  }
})

equalsBtn.addEventListener('click', () => {
  // Replace all Special Characters in memory, with characters that JS can calculate with.
  let expression = calculationMemory.replaceAll('√', '').replaceAll('^', '**').replaceAll('×', '*').replaceAll('÷', '/').replaceAll('_', ')**(1/2)')
  
  // Evalutating expression and error Handling
  try {
    let result = JSON.stringify(eval(expression))
    if (result.includes('.')) {
      decimalAllowed = false
    } else decimalAllowed = true
    previousOperand.textContent = currentOperand.textContent

    if (result == 'null') {
      currentOperand.textContent = "ERROR: RESULT IS UNDEFINED"
    } else {
      currentOperand.textContent = result
      calculationMemory =  result
    }

  } catch (e){
    // console.log(e);
    previousOperand.textContent = currentOperand.textContent
    currentOperand.textContent = 'ERROR: INVALID SYNTAX'
  }
  squareRootCounter = 0
})
//Updates the Current Operand Display
function logToCurrent() {
  currentOperand.textContent = calculationMemory.replaceAll('××', '^').replaceAll('_', ')')
}