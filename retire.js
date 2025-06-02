document.getElementById("inflation-rate").addEventListener("input", function () {
    document.getElementById("inflation-rate-display").textContent = this.value + "%";
});
document.getElementById("return-rate").addEventListener("input", function () {
    document.getElementById("return-rate-display").textContent = this.value + "%";
});
document.getElementById("retirement-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const currentSavings = parseFloat(document.getElementById("current-savings").value) || 0;
    const currentAge = parseInt(document.getElementById("current-age").value) || 0;
    const retirementAge = parseInt(document.getElementById("retirement-age").value) || 0;
    const retirementDuration = parseInt(document.getElementById("retirement-duration").value) || 20;
    const monthlyExpenses = parseFloat(document.getElementById("monthly-expenses").value) || 0;
    const inflationRate = parseFloat(document.getElementById("inflation-rate").value) / 100;
    const returnRate = parseFloat(document.getElementById("return-rate").value) / 100;
    const yearsUntilRetirement = retirementAge - currentAge;
    const inflatedExpenses = monthlyExpenses * Math.pow(1 + inflationRate, yearsUntilRetirement);
    const annualExpenses = inflatedExpenses * 12;
    const requiredSavings = annualExpenses * retirementDuration;
    const futureValue = currentSavings * Math.pow(1 + returnRate, yearsUntilRetirement);
    const monthlyContribution = (requiredSavings - futureValue) / 
        ((Math.pow(1 + returnRate / 12, yearsUntilRetirement * 12) - 1) / (returnRate / 12));
    document.getElementById("monthly-contribution").textContent = `Monthly Contribution: ₹${monthlyContribution.toFixed(2)}`;
    document.getElementById("total-savings").textContent = `Total Savings by Retirement: ₹${requiredSavings.toFixed(2)}`;
    document.getElementById("savings-progress").textContent = `Savings Goal Progress: ${Math.min(100, (futureValue / requiredSavings) * 100).toFixed(2)}%`;
    document.getElementById("goal-progress").style.width = `${Math.min(100, (futureValue / requiredSavings) * 100)}%`;
    createSavingsChart(futureValue, requiredSavings);
});
let savingsChart = null;  // Global variable to store the chart instance

function createSavingsChart(currentSavings, requiredSavings) {
    const ctx = document.getElementById('savingsChart').getContext('2d');
    
    // If there's an existing chart, destroy it
    if (savingsChart) {
        savingsChart.destroy();
    }

    // Create the new chart
    savingsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Start', 'Retirement'],
            datasets: [{
                label: 'Savings Over Time',
                data: [currentSavings, requiredSavings],
                borderColor: '#3b82f6',
                fill: false
            }]
        },
        options: { responsive: true }
    });
}

// document.getElementById("dark-mode-toggle").addEventListener("click", function () {
//     document.body.classList.toggle("dark-mode");
//     document.querySelectorAll(".container, button, input").forEach(el => el.classList.toggle("dark-mode"));
//     this.textContent = document.body.classList.contains("dark-mode") ? "Disable Dark Mode" : "Enable Dark Mode";
// });

document.getElementById("reset").addEventListener('click', () => {
    document.getElementById("current-savings").value = "";
    document.getElementById("current-age").value = "";
    document.getElementById("retirement-age").value = "";
    document.getElementById("retirement-duration").value = "";
    document.getElementById("monthly-expenses").value = "";
    document.getElementById("inflation-rate").value = 3;  // Reset range slider to default value
    document.getElementById("return-rate").value = 7;  // Reset range slider to default value
    document.getElementById("inflation-rate-display").textContent = "3%"; // Reset display for inflation rate
    document.getElementById("return-rate-display").textContent = "7%"; // Reset display for return rate

    // Clear the chart if reset
    if (savingsChart) {
        savingsChart.destroy();
    }
    
    // Reset the progress bar
    document.getElementById("goal-progress").style.width = "0%";
    document.getElementById("savings-progress").textContent = "Savings Goal Progress: 0%";
    document.getElementById("monthly-contribution").textContent = "Monthly Contribution: ₹0";
    document.getElementById("total-savings").textContent = "Total Savings by Retirement: ₹0";
});


document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".navbar .toggle_btn");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    toggleBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("open");
    });
});