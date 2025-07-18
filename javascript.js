// Math function initialization

// Addition function
function addition(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
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

// Initialization of all global variables
let firstNum = 0;
let secondNum = 0;
let operator = `+`;
let operatorChecker = 0;
let numberPressedChecker = 0;
let backupNum1 = 0;
let backupNum2 = 0;
let result = 0;
let backupOperator1 = "+";
let backupOperator2 = "+";
let equalsChecker = 0;

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
        console.log(button.textContent);
        if (button.textContent === ".") {
            toggleDecimalButton(decimalBehavior);
        }
        if (inputWindow.value === "0" && button.textContent === ".") {
            inputWindow.value = 0.;
            numberPressedChecker = 1;
        }
        if (inputWindow.value === "0" && button.textContent !== "." || operatorChecker >= 2 && numberPressedChecker === 0) {
            inputWindow.value = button.textContent;
            numberPressedChecker = 1;
        }
        else if (numberPressedChecker === 1) {
            inputWindow.value = inputWindow.value + button.textContent;
        }
        if (equalsChecker === 1) {
            if (button.textContent === ".") {
                numberPressedChecker = 1;
                inputWindow.value = 0;
                inputWindow.value = inputWindow.value + 0.;
            }
            inputWindow.value = button.textContent;
            equalsChecker = 0;
            numberPressedChecker = 1;
        }
        if (buttonBehavior === 1) {
            toggleOperatorButton(buttonBehavior);
        }
        console.log("numberPressedChecker: " + numberPressedChecker);
    })
})

// Clears all equation variables and input window on click
const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
    inputWindow.value = 0;
    resetGlobals();
});

// Initialize disable/enable checker for decimal button
let decimalBehavior = 0;
let decimalButton = document.querySelector("#decimalButton");

// Function for disabling and enabling decimal button
function toggleDecimalButton(num) {
    num = decimalBehavior;
        
    if (decimalBehavior === 0) {
        decimalButton.disabled = true;
    }
    else if (decimalBehavior === 1) {
        decimalButton.disabled = false;
    }

    // Alternates value on function call
    if (decimalBehavior === 0) {
        decimalBehavior = 1;
    }
    else if (decimalBehavior === 1) {
        decimalBehavior = 0;
    }
}

// Initialize disable/enable checker for operator buttons
let buttonBehavior = 0;

// Function for disabling and enabling operator buttons
function toggleOperatorButton(num) {
    num = buttonBehavior;
    operationButtonsArray.forEach((button) => {
        
        if (buttonBehavior === 0) {
            button.disabled = true;
        }
        else if (buttonBehavior === 1) {
            button.disabled = false;
        }

    })
    // Alternates value on function call
    if (buttonBehavior === 0) {
        buttonBehavior = 1;
    }
    else if (buttonBehavior === 1) {
        buttonBehavior = 0;
    }
}

// Saves number as firstNum and selects operator for operate function based off of button selection
const operationButtons = document.querySelectorAll(".operatorButton");
let operationButtonsArray = Array.from(operationButtons);
operationButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
        operatorChecker++;
        if (decimalBehavior === 1) {
        toggleDecimalButton(decimalBehavior);
        }
        toggleOperatorButton(buttonBehavior);
        // resets to 0 so next number button pressed clears the inputWindow
        numberPressedChecker = 0;
        operator = button.textContent;
        // add backup Operator
        console.log("Operator checker: " + operatorChecker);
        if (operatorChecker === 1) {
            backupOperator1 = operator;
        }
        // Calculates result of first two numbers if an operation sign is selected instead of the equals sign
        if (operatorChecker === 2) {
            secondNum = inputWindow.value;
            backupOperator2 = operator;
            result = operate(firstNum, backupOperator1, secondNum);
            if (result % 1 !== 0) {
                result = parseFloat(result.toPrecision(3));
            }
            inputWindow.value = result;
            backupNum1 = result;
        }
        // Allows for repeat calculations without using the equals sign
        // Saves the result in a backup variable that will allow "odd" numbered calls of the operator button to calculate correctly
        else if (operatorChecker % 2 === 0 && operatorChecker > 3) {
            firstNum = backupNum2;
            secondNum = inputWindow.value;
            backupOperator2 = operator;
            result = operate(firstNum, backupOperator1, secondNum);
            if (result % 1 !== 0) {
                result = parseFloat(result.toPrecision(3));
            }
            backupNum1 = result;
            inputWindow.value = result;
        }
        // Allows for repeat calculations while added a secondary backup number so that the results change accordingly
        // i.e. each "even" calculation utilizes "odd" calculation results
        else if (operatorChecker % 2 !== 0 && operatorChecker > 2) {
            firstNum = backupNum1;
            secondNum = inputWindow.value;
            backupOperator1 = operator;
            result = operate(firstNum, backupOperator2, secondNum);
            if (result % 1 !== 0) {
                result = parseFloat(result.toPrecision(3));
            }
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
    console.log(operatorChecker);
    numberPressedChecker = 0;
    if(operatorChecker === 0) {
        alert("ERROR: Two numbers were not received");
    }
    if (operatorChecker === 1) {
        secondNum = inputWindow.value;
        result = operate(firstNum, operator, secondNum);
    }
    if (operatorChecker > 1) {
        secondNum = inputWindow.value;
        result = operate(result, operator, secondNum);
    }
    if (result === Infinity) {
            result = 0;
            alert("Cannot divide by 0!");
            resetGlobals();
    }
    if (result % 1 !== 0) {
        result = parseFloat(result.toPrecision(3));
    }
    inputWindow.value = result;
    resetGlobals();
    equalsChecker = 1;
    
    // System checks
    console.log(typeof(result));
    console.log("firstNum: " + firstNum);
    console.log("operator: " + operator);
    console.log("secondNum: " + secondNum);
    console.log("result: " + result);
})

// Function to clear all global variables
function resetGlobals() {
    firstNum = 0;
    secondNum = 0;
    result = 0;
    backupNum1 = 0;
    backupNum2 = 0;
    operator = "+";
    backupOperator1 = "+";
    backupOperator2 = "+";
    operatorChecker = 0;
    numberPressedChecker = 0;
    buttonBehavior = 1;
    toggleOperatorButton(buttonBehavior);
    decimalBehavior = 1;
    toggleDecimalButton(decimalBehavior);
}

// Selection of delete button from HTML
const deleteButton = document.querySelector("#deleteButton");
// Event listener variable initialization
let wholeNumber = "";
let finalNumber = "";
// Removes the last digit in the string of inputWindow.value
deleteButton.addEventListener("click", () => {
    wholeNumber = inputWindow.value.toString();
    finalNumber = wholeNumber.substring(0, (wholeNumber.length - 1));
    finalNumber = Number(finalNumber);
    inputWindow.value = finalNumber;
})

// Selection of all buttons through the DOM
const oneButton = document.querySelector("#one");
const twoButton = document.querySelector("#two");
const threeButton = document.querySelector("#three");
const fourButton = document.querySelector("#four");
const fiveButton = document.querySelector("#five");
const sixButton = document.querySelector("#six");
const sevenButton = document.querySelector("#seven");
const eightButton = document.querySelector("#eight");
const nineButton = document.querySelector("#nine");
const zeroButton = document.querySelector("#zero");

const additionButton = document.querySelector("#additionButton");
const subtractionButton = document.querySelector("#subtractionButton");
const multiplicationButton = document.querySelector("#multiplicationButton");
const divisionButton = document.querySelector("#divisionButton");

// NOTE: Delete, clear, decimal, and equals defined earlier in document

// Event listener to add simulate corresponding button on keydown
let key  = 0;
document.addEventListener("keydown", (e) => {
    key = e.key
    if (key === "0") zeroButton.click();
    if (key === "1") oneButton.click();
    if (key === "2") twoButton.click();
    if (key === "3") threeButton.click();
    if (key === "4") fourButton.click();
    if (key === "5") fiveButton.click();
    if (key === "6") sixButton.click();
    if (key === "7") sevenButton.click();
    if (key === "8") eightButton.click();
    if (key === "9") nineButton.click();
    
    if (key === "+") additionButton.click();
    if (key === "-") subtractionButton.click();
    if (key === "*" || key === "x") multiplicationButton.click();
    if (key === "/") divisionButton.click();

    if (key === "Enter") equalsButton.click();
    if (key === "Backspace") deleteButton.click();
    if (key === ".") decimalButton.click();
    if (key === "q") clearButton.click();
});

// TO DO
// Add CSS styles to website
// Potential delete key bug fixes