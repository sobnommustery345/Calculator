let display = "0";
let equation = "";
let shouldResetDisplay = false;

const equationElement = document.querySelector('.equation');
const resultElement = document.querySelector('.result');

// Add event listeners to number buttons
document.querySelectorAll('.num-button').forEach(button => {
    button.addEventListener('click', () => {
        const num = button.textContent;
        if (shouldResetDisplay) {
            display = num;
            shouldResetDisplay = false;
        } else {
            display = display === "0" ? num : display + num;
        }
        updateDisplay();
    });
});

// Add event listeners to operator buttons
document.querySelectorAll('.op-button').forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent;
        // Convert operator symbols for JavaScript evaluation
        const jsOperator = operator === '×' ? '*' : operator === '÷' ? '/' : operator;
        equation = display + " " + jsOperator + " ";
        shouldResetDisplay = true;
        updateDisplay();
    });
});

// Clear button
document.querySelector('.clear-button').addEventListener('click', () => {
    display = "0";
    equation = "";
    shouldResetDisplay = false;
    updateDisplay();
});

// Delete button
document.querySelector('.delete-button').addEventListener('click', () => {
    if (display.length > 1) {
        display = display.slice(0, -1);
    } else {
        display = "0";
    }
    updateDisplay();
});

// Equals button
document.querySelector('.equals-button').addEventListener('click', () => {
    try {
        const evalEquation = equation.replace('×', '*').replace('÷', '/');
        const result = eval(evalEquation + display);
        if (!isFinite(result)) {
            throw new Error("Invalid operation");
        }
        equation = equation + display + " =";
        display = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        display = "Error";
        setTimeout(() => {
            display = "0";
            equation = "";
            updateDisplay();
        }, 1000);
        updateDisplay();
    }
});

function updateDisplay() {
    equationElement.textContent = equation;
    resultElement.textContent = display;
}
