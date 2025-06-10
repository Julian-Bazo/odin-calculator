// Math function initialization

// Addition function
function addition(num1, num2) {
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
