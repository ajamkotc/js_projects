const displayDiv = document.querySelector(".results-container");

//Stores the selected operation
let operationVar = "";

//Stores the displayed number when the user selects an operation
let storedInput;

/* Tracks if the displayed number is the result of a previous 
 * operation or has been inputted by the UserActivation. 
 */
let isResult = false;

/* Adds listeners for number buttons. 
 * When a number key is pressed, addToDisplay is called which adds
 * the number to the display. 
 */
const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        addToDisplay(parseInt(button.textContent));
    });
});

/* Adds listener for the clear button. 
 * When the clear button is pressed, the results div is set to 0.
 */
const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', clear);

//Adds listener for equals button. 
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener('click', calculateResult);

/* Adds listeners for the operation buttons. 
 * 
 */
const calcButtons = document.querySelectorAll(".calculator-button");
calcButtons.forEach((button) => {
    button.addEventListener('click', function() {
        addOperation(button.textContent);
    });
});

//Clears the display and displays only 0.
function clearDisplay() {displayDiv.textContent = 0;}

//Clears the display and resets all global variables
function clear() {
    clearDisplay();
    operationVar = "";
    storedInput = undefined;
    isResult = false;
}

function addOperation(operation) {
    //Enters if when operation is clicked for the first time
    if(!storedInput) {
        //Need to store the inputted number
        storedInput = parseInt(displayDiv.textContent); 

        //Display needs to clear after user selects an operation
        clearDisplay();
    }

    operationVar = operation;
}

function calculateResult() {
    let currentInput = parseInt(displayDiv.textContent);
    let result = operate(operationVar, storedInput, currentInput);
    storedInput = result;
    isResult = true;

    displayDiv.textContent = result;
}

/* This function adds an inputted number to the display. 
 * If the display is currently displaying 0, it replaces it with 
 * the inputted number. Otherwise, it concatenates the number to
 * the currently displayed number. 
 */
function addToDisplay(num) {    
    let currentDisplayNum = parseInt(displayDiv.textContent);

    if (currentDisplayNum == 0 || isResult) {
        displayDiv.textContent = num;
        isResult = false;
    }
    else {
        displayDiv.textContent += num;
        isResult = false;
    }
}

//These functions perform basic calculator functions
function add(num1, num2)        {return num1 + num2;}
function multiply(num1, num2)   {return num1 * num2;}
function divide(num1, num2)     {return num1 / num2;}
function square(num1)           {return num1 * num1;}
function power(num1, power)     {return num1 ** power;}
function subtract(num1, num2)   {return num1 - num2;}

//This function calls the appropriate function 
function operate(operator, num1, num2) {
    let returnValue;
    switch (operator) {
        case '+':
            returnValue = add(num1, num2);
            break;
        case '-':
            returnValue = subtract(num1, num2);
            break;
        case '*':
            returnValue = multiply(num1, num2);
            break;
        case '^2':
            returnValue = square(num1);
            break;
        case '^':
            returnValue = power(num1, num2);
            break;
        case '/':
            returnValue = divide(num1, num2);
            break;
        default:
            alert("Incorrect input");
    }

    if (returnValue) {
        return returnValue;
    }
    else {
        alert("Error, please try again.");
    }
}