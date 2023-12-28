document.addEventListener("DOMContentLoaded", function () {
    const calculatorScreen = document.querySelector('.calculator-screen');
    const calculatorKeys = document.querySelector('.calculator-keys');

    let currentInput = '0';
    let previousInput = '0';
    let operator = null;
    let shouldResetScreen = false;

    calculatorKeys.addEventListener('click', function (event) {
        const { target } = event;

        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.value);
            updateScreen();
            return;
        }

        if (target.classList.contains('btn')) {
            handleNumber(target.value);
            updateScreen();
            return;
        }

        if (target.classList.contains('decimal')) {
            inputDecimal();
            updateScreen();
            return;
        }

        if (target.classList.contains('all-clear')) {
            clearCalculator();
            updateScreen();
            return;
        }

        if (target.classList.contains('equal-sign')) {
            evaluate();
            updateScreen();
            return;
        }
    });

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && shouldResetScreen) {
            operator = nextOperator;
            return;
        }

        if (previousInput === '0') {
            previousInput = currentInput;
        } else {
            evaluate();
        }

        operator = nextOperator;
        shouldResetScreen = true;
    }

    function handleNumber(num) {
        if (shouldResetScreen) {
            currentInput = num;
            shouldResetScreen = false;
        } else {
            currentInput = currentInput === '0' ? num : currentInput + num;
        }
    }

    function inputDecimal() {
        if (shouldResetScreen) {
            currentInput = '0.';
            shouldResetScreen = false;
            return;
        }

        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function clearCalculator() {
        currentInput = '0';
        previousInput = '0';
        operator = null;
        shouldResetScreen = false;
    }

    function evaluate() {
        const inputValue = parseFloat(currentInput);
        const previousValue = parseFloat(previousInput);

        if (operator === '+') {
            currentInput = previousValue + inputValue;
        } else if (operator === '-') {
            currentInput = previousValue - inputValue;
        } else if (operator === '*') {
            currentInput = previousValue * inputValue;
        } else if (operator === '/') {
            currentInput = previousValue / inputValue;
        }

        operator = null;
    }

    function updateScreen() {
        calculatorScreen.value = currentInput;
    }
});
