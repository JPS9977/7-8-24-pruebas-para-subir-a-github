document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const convertButton = document.getElementById('convert');
    const result = document.getElementById('result');

    const apiKey = '31d6499ea660fcc7c2cc9a3e';  // Reemplaza con tu propia API key de ExchangeRate-API.
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // Cargar la lista de monedas
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
        })
        .catch(error => {
            console.error('Error fetching currency data:', error);
        });

    // Manejar el evento de conversión
    convertButton.addEventListener('click', () => {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amountValue = amount.value;

        if (from && to && amountValue) {
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amountValue}`)
                .then(response => response.json())
                .then(data => {
                    if (data.result === "success") {
                        result.textContent = `${amountValue} ${from} = ${data.conversion_result} ${to}`;
                    } else {
                        result.textContent = 'Error en la conversión. Por favor, intenta de nuevo.';
                    }
                })
                .catch(error => {
                    console.error('Error fetching conversion data:', error);
                    result.textContent = 'Error al obtener datos de conversión. Por favor, intenta de nuevo.';
                });
        } else {
            result.textContent = 'Por favor, completa todos los campos.';
        }
    });
});
