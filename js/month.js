document.addEventListener("DOMContentLoaded", function() {
    const startDateText = document.getElementById('start-date-month');
    const endDateText = document.getElementById('end-date-month');
    const monthRangeInput = document.getElementById('durationSlider');
    const startDateDisplay = document.getElementById('start-date-display');
    const editButtonmonth = document.getElementById('edit-button-months');
    const customModal = document.getElementById('customModal');
    const applyDateButton = document.getElementById('apply-date');
    const customModalClose = document.querySelector('.custom-modal-close');
    const calendarContainer = document.getElementById('calendar');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    
    let startDate = new Date();
    let currentMonth = startDate.getMonth();
    let currentYear = startDate.getFullYear();

    // Initialize with default value
    startDateText.textContent = "From - " + formatDate(startDate);
    startDateDisplay.textContent = formatDate(startDate);
    updateEndDate(startDate, parseInt(monthRangeInput.value));

    // Listen for input changes on the range slider
    monthRangeInput.addEventListener('input', function() {
        const selectedMonths = parseInt(monthRangeInput.value);
        updateEndDate(startDate, selectedMonths);
    });

    // Edit button click opens the custom modal
    editButtonmonth.addEventListener('click', function() {
        customModal.style.display = "flex";
        customModal.style.alignItems = "center";
        customModal.style.justifyContent = "center";

        renderCustomCalendar(currentMonth, currentYear);
    });

    // Close the custom modal when the user clicks on the close button
    customModalClose.onclick = function() {
        customModal.style.display = "none";
    }

    // Close the custom modal when the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == customModal) {
            customModal.style.display = "none";
        }
    }

    // Apply button click applies the selected start date from custom calendar
    applyDateButton.addEventListener('click', function() {
        const selectedDateElement = document.querySelector('.calendar-day.selected');
        if (selectedDateElement) {
            startDate = new Date(selectedDateElement.dataset.date);

            startDateText.textContent = "From - " + formatDate(startDate);
            startDateDisplay.textContent = formatDate(startDate);
            customModal.style.display = "none";

            // Calculate the new end date based on current range value
            const selectedMonths = parseInt(monthRangeInput.value);
            updateEndDate(startDate, selectedMonths);
        } else {
            alert("Please select a date from the calendar.");
        }
    });

    // Navigation buttons for calendar
    prevMonthButton.addEventListener('click', function() {
        if (currentMonth > startDate.getMonth() || currentYear > startDate.getFullYear()) {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCustomCalendar(currentMonth, currentYear);
        }
    });

    nextMonthButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCustomCalendar(currentMonth, currentYear);
    });

    // Function to update the displayed end date
    function updateEndDate(startDate, selectedMonths) {
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + selectedMonths);

        endDateText.textContent = "To - " + formatDate(endDate);
    }

    // Function to format date as DD-MM-YY
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // months are zero-based
        const year = date.getFullYear().toString().slice(-2); // get last two digits of the year
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    }

    // Function to render your custom calendar
    function renderCustomCalendar(month, year) {
        const nextMonth = (month + 1) % 12;
        const nextMonthYear = nextMonth === 0 ? year + 1 : year;

        calendarContainer.innerHTML = `
            <div class="calendar-month">
                ${generateCalendarHTML(month, year)}
            </div>
            <div class="calendar-month">
                ${generateCalendarHTML(nextMonth, nextMonthYear)}
            </div>
        `;

        // Add event listeners to calendar days
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', function() {
                const selectedDate = new Date(day.dataset.date);
                if (selectedDate >= startDate) {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    day.classList.add('selected');
                    console.log(`Selected date: ${day.dataset.date}`);
                } else {
                    alert("You cannot select a date before today.");
                }
            });
        });

        // Disable the previous button if the left month is the current month
        if (month <= startDate.getMonth() && year <= startDate.getFullYear()) {
            prevMonthButton.disabled = true;
        } else {
            prevMonthButton.disabled = false;
        }
    }

   
    function generateCalendarHTML(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
    
        let html = `<table class="calendar-table">
                        <thead>
                            <tr>
                                <th colspan="7" class="calendeInYearmonth">${monthNames[month]} ${year}</th>
                            </tr>
                            <tr>`;
        dayNames.forEach(day => {
            html += `<th>${day}</th>`;
        });
        html += `   </tr>
                        </thead>
                        <tbody>
                            <tr>`;
    
        for (let i = 0; i < firstDayIndex; i++) {
            html += `<td></td>`;
        }
    
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${month + 1}-${day}`;
            const isDisabled = (year < currentYear) || 
                               (year === currentYear && month < currentMonth) ||
                               (year === currentYear && month === currentMonth && day <= currentDay);
    
            if ((firstDayIndex + day - 1) % 7 === 0 && day !== 1) {
                html += `</tr><tr>`;
            }
    
            html += `<td class="calendar-day ${isDisabled ? ' disabled' : ''}" data-date="${dateStr}">${day}</td>`;
        }
    
        html += `   </tr>
                        </tbody>
                    </table>`;
    
        return html;
    }
    
});


document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("durationSlider");
    const tooltip = document.getElementById("sliderTooltip");

    const updateTooltip = () => {
        const value = slider.value;
        tooltip.textContent = `${value} month${value > 1 ? 's' : ''}`;

        const percent = (value - slider.min) / (slider.max - slider.min) * 100;
        const offset = -1.5; // Adjust as necessary to center the tooltip
        const tooltipPos = percent / 100 * (slider.offsetWidth - 20) + offset;

        tooltip.style.left = `${tooltipPos}px`;
        slider.style.background = `linear-gradient(to right, #2196F3 ${percent}%, #ddd ${percent}%)`;
    };
    slider.addEventListener("input", updateTooltip);
    // Initial positioning
    updateTooltip();
});