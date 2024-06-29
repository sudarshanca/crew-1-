document.addEventListener('DOMContentLoaded', () => {

    const checkInBtn = document.getElementById('checkInBtn');
    const selectDateBtn = document.getElementById('selectDateBtn');
    const datePicker = document.getElementById('datePicker');
    const selectedDateDisplay = document.getElementById('start-date-days');
    const selectedDateDisplaylast = document.getElementById('end-date-days');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');

    let startDate = null;
    let endDate = null;
    let currentDisplayedMonth = new Date().getMonth();
    let currentDisplayedYear = new Date().getFullYear();

    prevMonthBtn.addEventListener('click', () => {
        currentDisplayedMonth--;
        if (currentDisplayedMonth < 0) {
            currentDisplayedMonth = 11;
            currentDisplayedYear--;
        }
        showDatePicker();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDisplayedMonth++;
        if (currentDisplayedMonth > 11) {
            currentDisplayedMonth = 0;
            currentDisplayedYear++;
        }
        showDatePicker();
    });

    // Initial display of the date picker
    showDatePicker();

    function showDatePicker() {
        datePicker.innerHTML = ''; // Clear existing content

        const currentDate = new Date();
        const currentMonth = new Date().getMonth(); // Get the current actual month
        const currentYear = new Date().getFullYear(); // Get the current actual year

        // Generate current month dates
        generateMonthTable(currentDisplayedMonth, currentDisplayedYear, currentDate);
        // Generate next month dates
        generateMonthTable((currentDisplayedMonth + 1) % 12, currentDisplayedYear + Math.floor((currentDisplayedMonth + 1) / 12), currentDate);

        // Disable previous button if currentDisplayedMonth is the same as currentMonth
        if (currentDisplayedMonth === currentMonth && currentDisplayedYear === currentYear) {
            prevMonthBtn.disabled = true;
        } else {
            prevMonthBtn.disabled = false;
        }
    }

    function generateMonthTable(month, year, currentDate) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const monthYearHeader = document.createElement('th');
        monthYearHeader.classList.add('tableheaderclass');
        monthYearHeader.colSpan = 7;
        monthYearHeader.textContent = `${monthNames[month]} ${year}`;
        headerRow.appendChild(monthYearHeader);
        table.appendChild(headerRow);

        const dayNamesRow = document.createElement('tr');
        dayNames.forEach(dayName => {
            const th = document.createElement('th');
            th.textContent = dayName;
            dayNamesRow.appendChild(th);
        });
        table.appendChild(dayNamesRow);

        let date = 1;
        for (let i = 0; i < 6; i++) { // Create 6 rows (max possible weeks in a month)
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) { // Create 7 cells for days of the week
                if (i === 0 && j < firstDayOfMonth) {
                    const cell = document.createElement('td');
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cell = document.createElement('td');
                    const dateButton = document.createElement('button');
                    dateButton.textContent = date;

                    const buttonDate = new Date(year, month, date);
                    if (currentDate && buttonDate < currentDate) {
                        dateButton.disabled = true;
                        dateButton.classList.add('disabled');
                    }

                    dateButton.dataset.date = buttonDate.toISOString(); // Store the full date in a data attribute

                    dateButton.addEventListener('click', () => handleDateSelection(buttonDate));
                    cell.appendChild(dateButton);
                    row.appendChild(cell);
                    date++;
                }
            }
            table.appendChild(row);
        }
        datePicker.appendChild(table);
        highlightSelectedRange(); // Ensure highlighting is updated after generating the table
    }

    function handleDateSelection(date) {
        const selectedDate = new Date(date);

        if (!startDate || (startDate && endDate)) {
            startDate = selectedDate;
            endDate = null;
        } else if (startDate && !endDate && selectedDate >= startDate) {
            endDate = selectedDate;
        } else if (startDate && !endDate && selectedDate < startDate) {
            startDate = selectedDate;
        }

        updateSelectedDateDisplay();
        highlightSelectedRange();
    }

    function updateSelectedDateDisplay() {
        if (startDate && endDate) {
            selectedDateDisplay.textContent = `From: ${formatDate(startDate)}`;
            selectedDateDisplaylast.textContent = `To: ${formatDate(endDate)}`;
        } else if (startDate) {
            selectedDateDisplay.textContent = `Selected Date: ${formatDate(startDate)}`;
        } else {
            selectedDateDisplay.textContent = 'Selected Date: None';
        }
    }

    function highlightSelectedRange() {
        const buttons = document.querySelectorAll('#datePicker button');
        buttons.forEach(button => {
            const buttonDate = new Date(button.dataset.date);
            button.classList.remove('selected', 'start-date', 'end-date', 'in-range' );
            button.parentElement.classList.remove("parentofend-date");
            button.parentElement.classList.remove("parentofstart-date"); 
            button.parentElement.classList.remove("parentofInrange"); 
            if (startDate && endDate && buttonDate >= startDate && buttonDate <= endDate) {
                if (buttonDate.getTime() === startDate.getTime()) {
                    button.classList.add('start-date');
                    button.parentElement.classList.add("parentofstart-date");
                } else if (buttonDate.getTime() === endDate.getTime()) {
                    button.classList.add('end-date');
                    button.parentElement.classList.add("parentofend-date");
                } else {
                    button.classList.add('in-range');
                    button.parentElement.classList.add("parentofInrange");
                }
            } else if (startDate && !endDate && buttonDate.getTime() === startDate.getTime()) {
                button.classList.add('start-date');
                button.parentElement.classList.add("parentofstart-date");
            }
        });
    }

    function formatDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
});
