document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const btnValue = button.textContent;

            if (btnValue >= '0' && btnValue <= '9') {
                currentInput += btnValue;
                display.value = currentInput;
            } else if (btnValue === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += btnValue;
                    display.value = currentInput;
                }
            } else if (btnValue === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.value = '';
            } else if (btnValue === '←') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (btnValue === '=' && previousInput !== '' && currentInput !== '' && operator !== '') {
                let result;
                switch (operator) {
                    case '+':
                        result = parseFloat(previousInput) + parseFloat(currentInput);
                        break;
                    case '-':
                        result = parseFloat(previousInput) - parseFloat(currentInput);
                        break;
                    case '*':
                        result = parseFloat(previousInput) * parseFloat(currentInput);
                        break;
                    case '/':
                        result = parseFloat(previousInput) / parseFloat(currentInput);
                        break;
                    default:
                        break;
                }
                display.value = result;
                currentInput = result;
                previousInput = '';
                operator = '';
            } else {
                if (currentInput !== '') {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = btnValue;
                }
            }
        });
    });
});
