let chartInstance;

function createInitialChart() {
    const ctx = document.getElementById('tax-chart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Deductions', 'Investments', 'Taxable Income', 'Tax Amount'],
            datasets: [{
                label: 'Tax Calculation Breakdown',
                data: [0, 0, 0, 0, 0], // Initial values set to zero
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Call the function to create the initial chart when the page loads
window.onload = function() {
    createInitialChart();
};

document.getElementById('calculate').addEventListener('click', function () {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    const investments = parseFloat(document.getElementById('investments').value) || 0;
    const region = document.getElementById('region').value;
    let taxRate = 0;

    if (region === 'india') {
        if (income <= 250000) taxRate = 0;
        else if (income <= 500000) taxRate = 0.05;
        else if (income <= 1000000) taxRate = 0.2;
        else taxRate = 0.3;
    }

    const taxableIncome = Math.max(income - deductions - investments, 0);
    const taxAmount = taxableIncome * taxRate;

    document.getElementById('result-text').innerHTML = `
        Taxable Income: ₹${taxableIncome.toFixed(2)}<br>
        Tax Amount: ₹${taxAmount.toFixed(2)}
    `;

    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = document.getElementById('tax-chart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Deductions', 'Investments', 'Taxable Income', 'Tax Amount'],
            datasets: [{
                label: 'Tax Calculation Breakdown',
                data: [income, deductions, investments, taxableIncome, taxAmount],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

document.getElementById('reset').addEventListener('click', function () {
    document.getElementById('income').value = '';
    document.getElementById('deductions').value = '';
    document.getElementById('investments').value = '';
    document.getElementById('region').value = 'india';
    document.getElementById('result-text').innerHTML = '';
    if (chartInstance) {
        chartInstance.destroy();
        createInitialChart(); // Recreate the initial chart on reset
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".navbar .toggle_btn");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    toggleBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("open");
    });
});