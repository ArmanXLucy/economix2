// Exchange rates (for demonstration purposes)
const exchangeRates = {
    "Rupee": { "Dollar": 0.012, "Euro": 0.011, "Rubbel": 0.9, "Pounds": 0.009, "Flag": "india.svg","logo":"rupee.svg" },
    "Dollar": { "Rupee": 83.33, "Euro": 0.85, "Rubbel": 74.5, "Pounds": 0.75, "Flag": "us.svg" ,"logo":"dollar.svg"},
    "Euro": { "Rupee": 90.91, "Dollar": 1.18, "Rubbel": 87.5, "Pounds": 0.88, "Flag": "germany.svg","logo":"euro.svg" },
    "Rubbel": { "Rupee": 1.11, "Dollar": 0.013, "Euro": 0.011, "Pounds": 0.012, "Flag": "russia.svg" ,"logo":"rubbel.svg"},
    "Pounds": { "Rupee": 111.11, "Dollar": 1.33, "Euro": 1.14, "Rubbel": 83.33, "Flag": "uk.svg","logo":"pound.svg" }
};

// Function to update the flag based on selected currency
const updateFlag = (currency, element) => {
    element.innerHTML = `<img src="${exchangeRates[currency]["Flag"]}"/>`;
};

document.addEventListener('DOMContentLoaded', () => {
    const fromCurrencyElement = document.querySelector('.from_svg');
    const toCurrencyElement = document.querySelector('.to_svg');

    const fromCurrencyValue = document.getElementById('from_currency').value;
    const toCurrencyValue = document.getElementById('to_currency').value;

    updateFlag(fromCurrencyValue, fromCurrencyElement);
    updateFlag(toCurrencyValue, toCurrencyElement);
});

document.querySelector(".convert_button").addEventListener('click', () => {
    const first_select = document.getElementById('from_currency').value;
    const second_select = document.getElementById('to_currency').value;
    const input = parseFloat(document.getElementById('amount_input').value);

    // Validate input
    if (isNaN(input)) {
        document.querySelector('.result').innerText = "Enter a valid amount";
        return;
    }

    if (first_select === second_select) {
        document.querySelector('.result').innerText = "You can't convert the same currency";
        return;
    }

    // Perform the conversion
    const rate = exchangeRates[first_select][second_select];
    const result = rate * input;

    document.querySelector('.result').innerText = `${input} ${first_select} = ${result.toFixed(2)} ${second_select}`;
});

// Event listener for the "Reset" button
document.querySelector('.reset').addEventListener('click', () => {
    document.getElementById('from_currency').value = 'Rupee';
    document.getElementById('to_currency').value = 'Rupee';
    document.getElementById('amount_input').value = '';
    document.querySelector('.result').innerHTML = '';
});

// Event listeners for changes in currency selection
document.getElementById('from_currency').addEventListener('change', () => {
    updateFlag(document.getElementById('from_currency').value, document.querySelector('.from_svg'));
});

document.getElementById('to_currency').addEventListener('change', () => {
    updateFlag(document.getElementById('to_currency').value, document.querySelector('.to_svg'));
});
// console.log(change_cur_logo)
document.getElementById('from_currency').addEventListener('change',()=>{
    const first_select = document.getElementById('from_currency').value;
    const change_cur_logo=exchangeRates[first_select]["logo"]
    document.getElementById('cur_logo').src = change_cur_logo
})

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".navbar .toggle_btn");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    toggleBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("open");
    });
});