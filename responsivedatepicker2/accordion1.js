document.addEventListener('DOMContentLoaded', function () {

    const startDateText = document.getElementById('start-date-days');
    const endDateText = document.getElementById('end-date-days');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const accordionbody = document.querySelectorAll('.accordion-body');
    accordionbody[0].classList.add('open');
  
    const nextbtn = document.getElementById('nextbtnfornextaccordion');
    const clearAll = document.getElementById('clearallbtn');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const body = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon i');
            const currentlyOpen = document.querySelector('.accordion-body.open');

            // Close any currently open panel
            if (currentlyOpen && currentlyOpen !== body) {
                currentlyOpen.style.maxHeight = '0';
                currentlyOpen.style.padding = '0 10px';
                currentlyOpen.classList.remove('open');
                const openIcon = currentlyOpen.previousElementSibling.querySelector('.accordion-icon i');
                openIcon.classList.replace('bi-dash', 'bi-plus');
            }

            // Toggle the clicked panel
            if (body.classList.contains('open')) {
                body.style.maxHeight = '0';
                body.style.padding = '0 10px';
                body.classList.remove('open');
                icon.classList.replace('bi-dash', 'bi-plus');
            } else {
                body.style.maxHeight = body.scrollHeight + 'px';
                body.style.padding = '10px';
                body.classList.add('open');
                icon.classList.replace('bi-plus', 'bi-dash');
            }
        });
    });

    nextbtn.addEventListener('click', function () {
        const currentlyOpen = document.querySelector('.accordion-body.open');
        let nextAccordion;

        if (currentlyOpen) {
            const currentHeader = currentlyOpen.previousElementSibling;
            const currentItem = currentHeader.parentElement;
            nextAccordion = currentItem.nextElementSibling;

            // Close currently open accordion
            currentlyOpen.style.maxHeight = '0';
            currentlyOpen.style.padding = '0 10px';
            currentlyOpen.classList.remove('open');
            const openIcon = currentHeader.querySelector('.accordion-icon i');
            openIcon.classList.replace('bi-dash', 'bi-plus');
        } else {
            nextAccordion = document.querySelector('.accordion-item');
        }

        if (nextAccordion) {
            const nextBody = nextAccordion.querySelector('.accordion-body');
            const nextIcon = nextAccordion.querySelector('.accordion-icon i');

            // Open next accordion
            nextBody.style.maxHeight = nextBody.scrollHeight + 'px';
            nextBody.style.padding = '10px';
            nextBody.classList.add('open');
            nextIcon.classList.replace('bi-plus', 'bi-dash');
        }
    });

    clearAll.addEventListener('click', function () {

      if(startDateText.textContent !== null ){
        startDateText.textContent = "Select start date";
      }
      if(endDateText.textContent !== null ){
        endDateText.textContent = "Select end date";
      }
    });
});

