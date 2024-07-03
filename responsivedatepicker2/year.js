document.addEventListener("DOMContentLoaded", function() {
    const startDateText = document.getElementById('start-date-days');
    const endDateText = document.getElementById('end-date-days');
    const startDateDisplay1 = document.getElementById('start-date-display-year');
    const editButton = document.getElementById('edit-button-year');
    const customModalyear = document.getElementById('customModalyear');
    const applyDateButton1 = document.getElementById('apply-date-year');
    const customModalClose1 = document.querySelector('.custom-modal-close1');
    const calendarContaineryear = document.getElementById('calendarContaineryear');
    // const prevMonthButton = document.getElementById('prev-year');
    // const nextMonthButton = document.getElementById('next-year');
    const resetdateinyear = document.getElementById('resetdate');



    document.getElementById('nav-contact-tab').addEventListener('click', function() {
        const startDateElement = document.getElementById('start-date-days');
        const endDateElement = document.getElementById('end-date-days');
        
        const currentDate = new Date();
        const oneMonthLaterDate = new Date();
        oneMonthLaterDate.setMonth(currentDate.getMonth() + 12);
    
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[date.getMonth()]; // Get the month name
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
    
        startDateElement.textContent = ` ${formatDate(currentDate)}`;
        endDateElement.textContent = `${formatDate(oneMonthLaterDate)}`;
    });

    const durationButtons = {
        '1-year': 12,
        '1.5-year': 18,
        '2-year': 24,
        '2.5-year': 30,
        '3-year': 36
    };

    let startDate = new Date();
    let currentMonth = startDate.getMonth();
    let currentYear = startDate.getFullYear();

    // Initialize with default value
    startDateText.textContent = "from - " + formatDate(startDate);
    startDateDisplay1.textContent = formatDate(startDate);
    // updateEndDate(startDate, 12); // Default to 1 year

    // Listen for button clicks to set duration
    Object.keys(durationButtons).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', function() {
            // Remove 'active-button' class from all buttons
            Object.keys(durationButtons).forEach(id => {
                document.getElementById(id).classList.remove('active-button');
            });
    
            // Add 'active-button' class to the clicked button
            button.classList.add('active-button');
    
            const selectedMonths = durationButtons[buttonId];
            updateEndDate(startDate, selectedMonths);
        });
    });

    // Custom duration button click opens the custom modal
    document.getElementById('custom-duration').addEventListener('click', function() {
        customModalyear.style.display = "flex";
        renderCustomCalendar(currentMonth, currentYear);
    });

    // Edit button click opens the custom modal
    editButton.addEventListener('click', function() {
        customModalyear.style.display = "flex";
        customModalyear.style.alignItems = "center";
        customModalyear.style.justifyContent = "center";
        renderCustomCalendar(currentMonth, currentYear);
    });

    // Close the custom modal when the user clicks on the close button
    customModalClose1.onclick = function() {
        customModalyear.style.display = "none";
    }

    // Close the custom modal when the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == customModalyear) {
            customModalyear.style.display = "none";
        }
    }

    // Apply button click applies the selected start date from custom calendar
    applyDateButton1.addEventListener('click', function() {
        const selectedDateElement = document.querySelector('.calendar-day-year.selected');
        if (selectedDateElement) {
            startDate = new Date(selectedDateElement.dataset.date);

            startDateText.textContent = "from - " + formatDate(startDate);
            startDateDisplay1.textContent = formatDate(startDate);
            customModalyear.style.display = "none";

            // Calculate the new end date based on current range value
            const button = document.querySelector('.active-button')
            const selectedMonths = durationButtons[button.id];
            console.log(selectedMonths);
         
            updateEndDate(startDate, selectedMonths);
        } else {
            alert("Please select a date from the calendar.");
        }
    });

    // Navigation buttons for calendar
    // prevMonthButton.addEventListener('click', function() {
    //     if (currentMonth > startDate.getMonth() || currentYear > startDate.getFullYear()) {
    //         currentMonth--;
    //         if (currentMonth < 0) {
    //             currentMonth = 11;
    //             currentYear--;
    //         }
    //         renderCustomCalendar(currentMonth, currentYear);
    //     }
    // });

    // nextMonthButton.addEventListener('click', function() {
    //     currentMonth++;
    //     if (currentMonth > 11) {
    //         currentMonth = 0;
    //         currentYear++;
    //     }
    //     renderCustomCalendar(currentMonth, currentYear);
    // });

    // Function to update the displayed end date
    function updateEndDate(startDate, selectedMonths) {
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + selectedMonths);

        endDateText.textContent = "To -" + formatDate(endDate);
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
        // const nextMonth = (month + 1) % 12;
        // const nextMonthYear = nextMonth === 0 ? year + 1 : year;

    //     <div class="calendar-month">
    //     ${generateCalendarHTML(month, year)}
    // </div>
    // <div class="calendar-month">
    //     ${generateCalendarHTML(nextMonth, nextMonthYear)}
    // </div>
    //  <div class="calendar-month">

        calendarContaineryear.innerHTML = `
          
             
                ${generateCalendarHTML(month, year)}
            </div>
            <div class="calendar-month">
                ${generateCalendarHTML((month + 1) % 12, month + 1 > 11 ? year + 1 : year)}
            </div>
            <div class="calendar-month">
                ${generateCalendarHTML((month + 2) % 12, month + 2 > 11 ? year + 1 : year)}
            </div>
            <div class="calendar-month">
                ${generateCalendarHTML((month + 3) % 12, month + 3 > 11 ? year + 1 : year)}
            </div>
        `;

        // Add event listeners to calendar days
        document.querySelectorAll('.calendar-day-year').forEach(day => {
            day.addEventListener('click', function() {
                const selectedDate = new Date(day.dataset.date);
                // if (selectedDate >= startDate) {
                    document.querySelectorAll('.calendar-day-year').forEach(d => d.classList.remove('selected'));
                    day.classList.add('selected');
                // } else {
                //     alert("You cannot select a date before today.");
                // }
            });
        });

        // Disable the previous button if the left month is the current month
        // if (month <= startDate.getMonth() && year <= startDate.getFullYear()) {
        //     prevMonthButton.disabled = true;
        // } else {
        //     prevMonthButton.disabled = false;
        // }
        // Add the Load More button
        const loadMoreButtons = document.createElement('button');
        loadMoreButtons.id = "load-mores";
        loadMoreButtons.textContent = "Load more...";
        calendarContaineryear.appendChild(loadMoreButtons);
    
          // Add event listener to the Load More button
          loadMoreButtons.addEventListener('click', function() {
            loadMoreMonthsyear();
        });

        resetdateinyear.addEventListener('click', function() {
            const selectelement = document.querySelector('.calendar-day-year.selected');
            selectelement.classList.remove('selected');
        });
    }


    let lastDisplayedMonthy = startDate.getMonth() + 3; // Start from the fourth month
    let lastDisplayedYeary = startDate.getFullYear();

    // Adjust lastDisplayedYear if lastDisplayedMonth exceeds 11
    if (lastDisplayedMonthy > 11) {
        lastDisplayedMonthy -= 12;
        lastDisplayedYeary += 1;
    }


    // Function to load more months
    function loadMoreMonthsyear() {
        for (let i = 1; i <= 4; i++) {
            lastDisplayedMonthy++;
            if (lastDisplayedMonthy > 11) {
                lastDisplayedMonthy = 0;
                lastDisplayedYeary++;
            }
            const newMonthHTMLy = generateCalendarHTML(lastDisplayedMonthy, lastDisplayedYeary);
            const newMonthDivy = document.createElement('div');
            newMonthDivy.className = 'calendar-month';
            newMonthDivy.innerHTML = newMonthHTMLy;
            calendarContaineryear.insertBefore(newMonthDivy, document.getElementById('load-mores'));

            // Add event listeners to the new calendar days
            newMonthDivy.querySelectorAll('.calendar-day-year').forEach(day => {
                day.addEventListener('click', function() {
                    const selectedDate = new Date(day.dataset.date);
                    document.querySelectorAll('.calendar-day-year').forEach(d => d.classList.remove('selected'));
                    day.classList.add('selected');
                });
            });
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
                                <th class="calendar-month-year" colspan="7">${monthNames[month]} ${year}</th>
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
    
            html += `<td class="calendar-day-year ${isDisabled ? ' disabled' : ''}" data-date="${dateStr}">${day}</td>`;
        }
    
        html += `   </tr>
                        </tbody>
                    </table>`;
    
        return html;
    }
    
});


