document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const convertButton = document.getElementById('convert');
    const result = document.getElementById('result');

    const apiKey = 'TU_API_KEY';  // Reemplaza con tu propia API key de ExchangeRate-API.
    const apiURL = `https://openexchangerates.org/${abd892e34c9c4e8fb699c9537da3a66a}/latest/USD`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = currency;
                option2.value = currency;
                option1.textContent = currency;
                option2.textContent = currency;
                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });
        });

    convertButton.addEventListener('click', () => {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amountValue = amount.value;

        if (from && to && amountValue) {
            fetch(`https://openexchangerates.org/${abd892e34c9c4e8fb699c9537da3a66a}/pair/${from}/${to}/${amountValue}`)
                .then(response => response.json())
                .then(data => {
                    result.textContent = `${amountValue} ${from} = ${data.conversion_result} ${to}`;
                });
        } else {
            result.textContent = 'Por favor, completa todos los campos.';
        }
    });
});
