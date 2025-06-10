// Math function initialization

// Addition function
function addition(num1, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    let sum = num1 + num2;
    return sum;
}
// Subtraction function
function subtraction(num1, num2) {
    let difference = num1 - num2;
    return difference;
}
// Multiplication function
function multiplication(num1, num2) {
    let product = num1 * num2;
    return product;
}
// Division function
function division(num1, num2) {
    let quotient = num1 / num2;
    return quotient;
}

// Initialization of Operator function variables with filler values
let firstNum = 5;
let secondNum = 3;
let operator = `+`;

// Operate function
function operate(firstNum, operator, secondNum) {
    if (operator === "+") {
        return addition(firstNum, secondNum);
    }
    if (operator === "-") {
        return subtraction(firstNum, secondNum);
    }
    if (operator === "*" || operator === "x") {
        return multiplication(firstNum, secondNum);
    }
    if (operator === "/") {
        return division(firstNum, secondNum);
    }
}

// Initialize input window
const inputWindow = document.createElement('input');
inputWindow.type = "text";
inputWindow.disabled = true; // Input no longer editable
inputWindow.value = 0;

// Insert input window above calculator buttons
const entireCalculator = document.querySelector("#inputContainer");
entireCalculator.appendChild(inputWindow);

// Create Array from node list of all number buttons
const numberButtons = document.querySelectorAll(".numButton");
let numberButtonsArray = Array.from(numberButtons);

// Add number value of button clicked to input window
// forEach to apply event to all number buttons
numberButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
        if (inputWindow.value === "0") {
            inputWindow.value = button.textContent;
        }
        else {
            inputWindow.value = inputWindow.value + button.textContent;
        }
    })
})

// Clears all equation variables and input window on click
const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
    inputWindow.value = 0;
    firstNum = 0;
    secondNum = 0;
    result = 0;
});

// Saves number as firstNum and selects operator for operate function based off of button selection
const operationButtons = document.querySelectorAll(".operatorButton");
let operationButtonsArray = Array.from(operationButtons);
operationButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
        firstNum = inputWindow.value;
        operator = button.textContent;
        inputWindow.value = 0;
    })
});

const equalsButton = document.querySelector("#equalsButton");
equalsButton.addEventListener("click", () => {
    secondNum = inputWindow.value;
    inputWindow.value = operate(firstNum, operator, secondNum);
})