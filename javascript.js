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
let firstNum = 0;
let secondNum = 0;
let operator = `+`;
let operatorChecker = 0;
let backupNum1 = 0;
let backupNum2 = 0;
let result = 0;

// Operate function
function operate(firstNum, operator, secondNum) {
    if (operator === "+") {
        result = addition(firstNum, secondNum);
        return result;
    }
    if (operator === "-") {
        result = subtraction(firstNum, secondNum);
        return result;
    }
    if (operator === "*" || operator === "x") {
        result = multiplication(firstNum, secondNum);
        return result;
    }
    if (operator === "/") {
        result = division(firstNum, secondNum);
        return result;
    }
}

// Initialize input window
const inputWindow = document.createElement('input');
inputWindow.type = "text";
inputWindow.id = "inputWindow";
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
        if (inputWindow.value === "0" || operatorChecker >= 2) {
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
    backupNum = 0;
    operatorChecker = 0;
});

// Saves number as firstNum and selects operator for operate function based off of button selection
const operationButtons = document.querySelectorAll(".operatorButton");
let operationButtonsArray = Array.from(operationButtons);
operationButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
        operatorChecker++;
        operator = button.textContent;
        console.log("Operator checker: " + operatorChecker);
        if (operatorChecker === 2) {
            // Try to figure out why it is not running an equation
            // firstNum = backupNum;
            secondNum = inputWindow.value;
            result = operate(firstNum, operator, secondNum);
            inputWindow.value = result;
            backupNum1 = result;
        }
        else if (operatorChecker % 2 === 0 && operatorChecker > 3) {
            firstNum = backupNum2;
            secondNum = inputWindow.value;
            result = operate(firstNum, operator, secondNum);
            backupNum1 = result;
            inputWindow.value = result;
        }
        else if (operatorChecker % 2 !== 0 && operatorChecker > 2) {
            firstNum = backupNum1;
            secondNum = inputWindow.value;
            result = operate(firstNum, operator, secondNum);
            backupNum2 = result;
            inputWindow.value = result;
        }

        else {
        firstNum = inputWindow.value;
        inputWindow.value = 0;
        }
    })
});

const equalsButton = document.querySelector("#equalsButton");
equalsButton.addEventListener("click", () => {
    secondNum = inputWindow.value;
    operatorChecker = 0;
    if (firstNum !== 0 && secondNum !== 0) {
    result = operate(firstNum, operator, secondNum);
        if (result === Infinity) {
            result = 0;
            alert("Cannot divide by 0!");
            // result = 0;
        }

    firstNum = 0;
    secondNum = 0;
    inputWindow.value = result;
    }
    // System checks
    console.log(typeof(result));
    console.log("firstNum: " + firstNum);
    console.log("operator: " + operator);
    console.log("secondNum: " + secondNum);
    console.log("result: " + result);
})

// if (inputWindow.textContent === 0 ) {
//     inputWindow.textContent.style.opacity = 
// }