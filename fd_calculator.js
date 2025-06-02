document.addEventListener("DOMContentLoaded", function () {
    let investInput = document.querySelector('.invest');
    let interestInput = document.querySelector('.interest');
    let timeInput = document.querySelector('.time');
    let calculateButton = document.querySelector('.button');

    let investedamountInput = document.querySelector('.investedamt');
    let estimatedamountInput = document.querySelector('.estdrnt');
    let totalamountInput = document.querySelector('.totval');

    const ctx = document.getElementById('investmentChart').getContext('2d');
    let chart;

    // Function to create the chart
    function createChart(investedamount, estimatedreturn) {
        if (chart) {
            chart.destroy(); // Destroy previous chart if it exists
        }

        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Invested Amount', 'Estimated Return'],
                datasets: [{
                    label: 'Investment Breakdown',
                    data: [investedamount, estimatedreturn],
                    backgroundColor: ['#A294F9', '#F5EFFF'],
                    borderColor: ['black', 'black'],
                    borderWidth: 0.5
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
                            }
                        }
                    }
                }
            }
        });
    }

    // Create initial chart with default values (0)
    createChart(0, 0);

    // Event listener for the calculate button
    calculateButton.addEventListener('click', () => {
        let investedamount = parseInt(investInput.value);
        let interestamount = parseInt(interestInput.value);
        let timeperiod = parseInt(timeInput.value);

        if (!isNaN(investedamount) && !isNaN(interestamount) && !isNaN(timeperiod)) {
            let estimatedreturn = (investedamount * interestamount * timeperiod) / 100;
            let totalvalue = investedamount + estimatedreturn;
            investedamountInput.value = investedamount.toFixed(2);
            estimatedamountInput.value = estimatedreturn.toFixed(2);
            totalamountInput.value = totalvalue.toFixed(2);

            // Create a new chart with updated values
            createChart(investedamount, estimatedreturn);
        } else {
            alert("Please enter a valid number in all boxes!");
        }
    });

    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    let currentIndex = 0;
    const timeInterval = 4000;

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        slider.scrollTo({
            left: currentIndex * slider.clientWidth,
            behavior: 'smooth'
        });
    }

    setInterval(nextImage, timeInterval);

    // Reset button listener
    document.querySelector('.reset').addEventListener('click', function () {
        document.querySelector('.invest').value = "";
        document.querySelector('.interest').value = "";
        document.querySelector('.time').value = "";
        document.querySelector('.investedamt').value = "";
        document.querySelector('.estdrnt').value = "";
        document.querySelector('.totval').value = "";

        // Reset the chart to initial values
        createChart(0, 0);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".navbar .toggle_btn");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    toggleBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("open");
    });
});