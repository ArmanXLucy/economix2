// script.js

// Initialize the chart with default values (all 0)
const ctx = document.getElementById("impactChart").getContext("2d");

let impactChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Revenue", "Expenses", "Profit/Loss"],
        datasets: [{
            label: 'Amount in ₹',
            data: [0, 0, 0], // Default values are all 0
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to handle calculation and update chart
document.getElementById("calculate").addEventListener("click", function() {
    // Get input values
    const attendees = parseInt(document.getElementById("attendees").value) || 0;
    const ticketPrice = parseFloat(document.getElementById("ticket-price").value) || 0;
    const sponsorship = parseFloat(document.getElementById("sponsorship").value) || 0;
    const expenses = parseFloat(document.getElementById("expenses").value) || 0;

    // Calculate total revenue and net profit
    const totalRevenue = (attendees * ticketPrice) + sponsorship;
    const netProfit = totalRevenue - expenses;

    // Display the result
    const resultDiv = document.getElementById("result");
    if (netProfit > 0) {
        resultDiv.innerHTML = `Profit: ₹${netProfit.toFixed(2)} <br> Total Revenue: ₹${totalRevenue.toFixed(2)}`;
        resultDiv.style.color = "black";
    } else if (netProfit < 0) {
        resultDiv.innerHTML = `Loss: ₹${Math.abs(netProfit).toFixed(2)} <br> Total Revenue: ₹${totalRevenue.toFixed(2)}`;
        resultDiv.style.color = "black";
    } else {
        resultDiv.innerHTML = `Break-even! No profit, no loss.<br>Total Revenue: ₹${totalRevenue.toFixed(2)}`;
        resultDiv.style.color = "black";
    }

    // Update the chart with new values
    impactChart.data.datasets[0].data = [totalRevenue, expenses, netProfit];
    impactChart.update();
});

// Reset the form and chart
document.getElementById("reset").addEventListener("click", function() {
    // Clear the input fields
    document.getElementById("attendees").value = '';
    document.getElementById("ticket-price").value = '';
    document.getElementById("sponsorship").value = '';
    document.getElementById("expenses").value = '';

    // Clear the result display
    document.getElementById("result").innerHTML = '';

    // Reset the chart to default values
    impactChart.data.datasets[0].data = [0, 0, 0]; // Reset all values to 0
    impactChart.update();
});


document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".navbar .toggle_btn");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    toggleBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("open");
    });
});
