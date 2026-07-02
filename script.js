/*

Buttons will click numbers and show up on the display. 

When an operator is pushed the number should be stored in a variable and the operator will also be stored.
    - If a number is not pushed the stored number defaults to zero

After the first number and operator are stored then we move on to the second number

When we press equals the second number is stored and the final value is returned. 

*/


const currentDisplay = document.querySelector(".current");
const displayHistory = document.querySelector(".displayHistory");
const operatorButtons = document.querySelectorAll(".operator");


// Display


// Number buttons
const buttonsContainer = document.querySelector(".buttonsContainer");
buttonsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("number")) {
        clear.textContent = "C"; // reset button when user starts typing
        if (currentDisplay.textContent === "0") {
            currentDisplay.textContent = e.target.textContent;
        } else {
            currentDisplay.textContent += e.target.textContent;
        }
    }
})

// Operators
buttonsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("operator")) {
        if ((/\d[+\-×÷]/.test(currentDisplay.textContent))) return;
        currentDisplay.textContent += e.target.textContent;
    }
})

// Delete and Clear

const del = document.querySelector("#del");
del.addEventListener("click", () => {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    if (currentDisplay.textContent ==="") {
        currentDisplay.textContent = "0";
    }
})

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    currentDisplay.textContent = "0";
    if (clear.textContent === "AC") {
        displayHistory.textContent = "";
        clear.textContent = "C";
    } else {
        clear.textContent = "AC";
    }
})

//plusminus
const plusminus = document.querySelector("#plusminus");
plusminus.addEventListener("click", () => {
    if (/\d.*[+×÷]/.test(currentDisplay.textContent) || /[+\-×÷]-/.test(currentDisplay.textContent)) {
        // operator is present, toggle second number
        const parts = currentDisplay.textContent.split(/([+×÷-](?!.*[+×÷]))/);

        const secondIndex = parts.length - 1; // always grab the last part
        const signIndex = parts.length - 2;   // and the character before it

        if (parts[signIndex] === "-") {
            parts.splice(signIndex, 1); // remove the "-"
        } else {
            parts[secondIndex] = "-" + parts[secondIndex]; // prepend "-"
        }
        currentDisplay.textContent = parts.join("");
    } else {
        // no operator, toggle the whole display
        if (currentDisplay.textContent === "0") return;
        if (currentDisplay.textContent.startsWith("-")) {
            currentDisplay.textContent = currentDisplay.textContent.slice(1);
        } else {
            currentDisplay.textContent = "-" + currentDisplay.textContent;
        }
    }
})

// Decimal 
const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
    if (currentDisplay.textContent.endsWith(".")) return;
    currentDisplay.textContent += ".";
})

// Equals 
const equals = document.querySelector("#equals"); 
equals.addEventListener("click", () => {
    if (!(/\d+[+\-×÷]-?\d+/.test(currentDisplay.textContent))) return;
    displayHistory.textContent = currentDisplay.textContent;

    const match = currentDisplay.textContent.match(/^(-?\d+\.?\d*)([+\-×÷])(-?\d+\.?\d*)$/);
    if (!match) return;

    const firstNumber = parseFloat(match[1]);
    const operator = match[2];
    const secondNumber = parseFloat(match[3]);

    let result = operate(firstNumber, secondNumber, operator);
    currentDisplay.textContent = result;
})

//Calculate functions 

const operate = function(firstNumber, secondNumber, operator) {
    if (operator === "+") {
        return firstNumber + secondNumber;
    } else if (operator === "-") {
        return firstNumber - secondNumber;
    } else if (operator === "×") {
        return firstNumber * secondNumber;
    } else if (operator === "÷") {
        return firstNumber / secondNumber;
    }
}


