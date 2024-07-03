document.addEventListener("DOMContentLoaded", function() {
    const startDateText = document.getElementById('start-date-days');
    const endDateText = document.getElementById('end-date-days');
    const monthRangeInput = document.getElementById('countcontent');
    const incrementinmonth = document.getElementById('incrementinmonth');
    const decrementbymonth = document.getElementById('decrementbymonth');
    const startDateDisplay = document.getElementById('start-date-display');
    const editButtonmonth = document.getElementById('edit-button-months');
    const customModal = document.getElementById('customModal');
    const applyDateButton = document.getElementById('apply-date');
    const customModalClose = document.querySelector('.custom-modal-close');
    const calendarContainer = document.getElementById('calendar');
    const resetdateinmonth = document.getElementById("reset");
    const skip = document.getElementById("skip");

    // const prevMonthButton = document.getElementById('prev-month');
    // const nextMonthButton = document.getElementById('next-month');

    document.getElementById('nav-profile-tab').addEventListener('click', function() {
        const startDateElement = document.getElementById('start-date-days');
        const endDateElement = document.getElementById('end-date-days');
        
        const currentDate = new Date();
        const oneMonthLaterDate = new Date();
        oneMonthLaterDate.setMonth(currentDate.getMonth() + 1);
    
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[date.getMonth()]; // Get the month name
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
    
        startDateElement.textContent = `${formatDate(currentDate)}`;
        endDateElement.textContent = `${formatDate(oneMonthLaterDate)}`;
    });
    
    let startDate = new Date();
    let currentMonth = startDate.getMonth();
    let currentYear = startDate.getFullYear();

    let monthcount = 1;

    const countDisplay = document.querySelector('.count-display');
    
    incrementinmonth.addEventListener('click', () => {
        if (monthcount < 12) {
            monthcount++;
            updateCountDisplay();
            const countcontent = document.getElementById('countcontent');
            console.log(countcontent.textContent)
            updateEndDate(startDate, parseInt(monthRangeInput.textContent));
        }
    });
    
    decrementbymonth.addEventListener('click', () => {
        if (monthcount > 1) {
            monthcount--;
            updateCountDisplay();
            const countcontent = document.getElementById('countcontent');
            console.log(countcontent.textContent)
            updateEndDate(startDate, parseInt(monthRangeInput.textContent));
        }
    });
    
    function updateCountDisplay() {
        countDisplay.textContent = monthcount;
        // console.log(monthcount);
    }
    
    // Initial display update
    updateCountDisplay();
    const countcontent = document.getElementById('countcontent');
    console.log(countcontent.textContent);

    // Initialize with default value
    startDateText.textContent = "From - " + formatDate(startDate);
    startDateDisplay.textContent = formatDate(startDate);
    // updateEndDate(startDate, parseInt(monthRangeInput.textContent));

    // Listen for input changes on increment and decrement
    // incrementinmonth.addEventListener('input', function() {
    //   const countmonth =   document.getElementById('countcontent');
    //     const selectedMonths = parseInt(countmonth.textContent);
    //     console.log(selectedMonths);
    //     updateEndDate(startDate, selectedMonths);
    // });
    // decrementbymonth.addEventListener('input', function() {
    //   const countmonth =   document.getElementById('countcontent');
    //     const selectedMonths = parseInt(countmonth.textContent);
    //     updateEndDate(startDate, selectedMonths);
    // });

    // Edit button click opens the custom modal
    editButtonmonth.addEventListener('click', function() {
        customModal.style.display = "flex";
        customModal.style.alignItems = "start";
        // customModal.style.justifyContent = "center";

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
            const selectedMonths = parseInt(monthRangeInput.textContent);
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
        calendarContainer.innerHTML = `
            <div class="calendar-month">
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
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', function() {
                const selectedDate = new Date(day.dataset.date);
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
            });
        });

        // Add the Load More button
        const loadMoreButton = document.createElement('button');
        loadMoreButton.id = "load-more";
        loadMoreButton.textContent = "Load more...";
        calendarContainer.appendChild(loadMoreButton);
      
        // const resetdateinmonth = document.createElement('button');
        // resetdateinmonth.id = "reset";
        // resetdateinmonth.textContent = "reset";
        // calendarContainer.appendChild(resetdateinmonth);

        // Add event listener to the Load More button
        loadMoreButton.addEventListener('click', function() {
            loadMoreMonths();
        });

       

        // Add event listener to the rset the selected date 
        resetdateinmonth.addEventListener('click', function() {
            const selectedDateElement = document.querySelector('.calendar-day.selected');
            selectedDateElement.classList.remove('selected');
        });

        // Disable the previous button if the left month is the current month
        // if (month <= startDate.getMonth() && year <= startDate.getFullYear()) {
        //     prevMonthButton.disabled = true;
        // } else {
        //     prevMonthButton.disabled = false;
        // }
    }

    let lastDisplayedMonth = startDate.getMonth() + 3; // Start from the fourth month
    let lastDisplayedYear = startDate.getFullYear();

    // Adjust lastDisplayedYear if lastDisplayedMonth exceeds 11
    if (lastDisplayedMonth > 11) {
        lastDisplayedMonth -= 12;
        lastDisplayedYear += 1;
    }

    // Function to load more months
    function loadMoreMonths() {
        for (let i = 1; i <= 4; i++) {
            lastDisplayedMonth++;
            if (lastDisplayedMonth > 11) {
                lastDisplayedMonth = 0;
                lastDisplayedYear++;
            }
            const newMonthHTML = generateCalendarHTML(lastDisplayedMonth, lastDisplayedYear);
            const newMonthDiv = document.createElement('div');
            newMonthDiv.className = 'calendar-month';
            newMonthDiv.innerHTML = newMonthHTML;
            calendarContainer.insertBefore(newMonthDiv, document.getElementById('load-more'));

            // Add event listeners to the new calendar days
            newMonthDiv.querySelectorAll('.calendar-day').forEach(day => {
                day.addEventListener('click', function() {
                    const selectedDate = new Date(day.dataset.date);
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
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

    // Initial render
    renderCustomCalendar(currentMonth, currentYear);
});
