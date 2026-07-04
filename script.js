
// DOM variables 

const currentDisplay = document.querySelector(".current");
const displayHistory = document.querySelector(".displayHistory");
const operatorButtons = document.querySelectorAll(".operator");
const buttonsContainer = document.querySelector(".buttonsContainer");
const del = document.querySelector("#del");
const clear = document.querySelector("#clear");
const plusminus = document.querySelector("#plusminus");
const decimal = document.querySelector("#decimal");
const equals = document.querySelector("#equals"); 

let hasError = false;

// Display


// Number buttons
buttonsContainer.addEventListener("click", (e) => {
    if (hasError && e.target.id !== "clear" && e.target.id !== "del") return;

    if (e.target.classList.contains("number")) {
        if (clear.textContent === "AC") {
            clear.textContent = "C";
        }
        if (currentDisplay.textContent === "0") {
            currentDisplay.textContent = e.target.textContent;
        } else {
            currentDisplay.textContent += e.target.textContent;
        }
    }
})

// Operators
buttonsContainer.addEventListener("click", (e) => {
    if (hasError && e.target.id !== "clear" && e.target.id !== "del") return;

    if (e.target.classList.contains("operator")) {
        if ((/\d[+\-×÷]/.test(currentDisplay.textContent))) return;
        currentDisplay.textContent += e.target.textContent;
    }
})

// Delete and Clear

del.addEventListener("click", () => {  
    if (currentDisplay.textContent === "Error") {
        currentDisplay.textContent = "0"
        hasError = false;
    } else {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
        if (currentDisplay.textContent ==="") {
            currentDisplay.textContent = "0";
        }
    }})

clear.addEventListener("click", () => {
    hasError = false;
    currentDisplay.textContent = "0";
    
    if (clear.textContent === "AC") {
        displayHistory.textContent = "";
        clear.textContent = "C";
    } else if (displayHistory.textContent !== "") {
        clear.textContent = "AC";
    }
})

//plusminus
plusminus.addEventListener("click", (e) => {
    if (hasError && e.target.id !== "clear" && e.target.id !== "del") return;

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
decimal.addEventListener("click", (e) => {
    if (hasError && e.target.id !== "clear" && e.target.id !== "del") return;

    if (currentDisplay.textContent.endsWith(".")) return;
    currentDisplay.textContent += ".";
})

// Equals 
equals.addEventListener("click", () => {
    if (!(/\d+[+\-×÷]-?\d+/.test(currentDisplay.textContent))) return;
    displayHistory.textContent = currentDisplay.textContent;

    const match = currentDisplay.textContent.match(/^(-?\d+\.?\d*)([+\-×÷])(-?\d+\.?\d*)$/);
    if (!match) return;

    const firstNumber = parseFloat(match[1]);
    const operator = match[2];
    const secondNumber = parseFloat(match[3]);

    let result = operate(firstNumber, secondNumber, operator);

    if (result === "Error") {
        hasError = true;
        }
    
    currentDisplay.textContent = result;
})

//Calculate functions 

const operate = function(firstNumber, secondNumber, operator) {
    if (operator === "÷" && secondNumber == 0) return "Error";
    
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


// Keyboard support 

document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        document.querySelector(`[data-key="${e.key}"]`).click();
    }

    const keyMap = {
        "+": "#addition",
        "-": "#subtract",
        "*": "#multiply",
        "/": "#divide",
        "Enter": "#equals",
        "=": "#equals",
        "Backspace": "#del",
        "Escape": "#clear",
        "%": "#percent",
        ".": "#decimal",
    };

    if (keyMap[e.key]) {
        document.querySelector(keyMap[e.key]).click();
    }
})