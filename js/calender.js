'use strict';

// Calender 
const monthYear = document.getElementById('month-year');
const dates = document.getElementById('dates');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentDate = new Date();
// Events to include on the calender 
const events = {
    "2025-04-07": { title: "Niner United Worship Night", description: "Join us for a night of worship" },
    "2025-04-10": { title: "Delight Meeting", description: "Join us for our weekly gathering" },
    "2025-04-11": { title: "Ignite Meeting", description: "Join us for our weekly gathering" },
    "2025-04-17": { title: "Delight Meeting", description: "Join us for our weekly gathering" },
    "2025-04-24": { title: "Delight Meeting", description: "Join us for our weekly gathering" },
    "2025-04-08": { title: "M28 Meeting", description: "Join us for our weekly gathering" },
    "2025-04-15": { title: "M28 Meeting", description: "Join us for our weekly gathering" },
    "2025-04-22": { title: "M28 Meeting", description: "Join us for our weekly gathering" },
    "2025-04-29": { title: "M28 Meeting", description: "Join us for our weekly gathering" },
    "2025-04-30": { title: "Niner United LDOC Prayer Night", description: "Join us to pray over finals week and those graduating" }
};

function generateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();  
    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0); // last date of the month
    const lastDay = lastDate.getDay(); // day of the week for the last date
    const daysInMonth = lastDate.getDate(); // number of days in the month

    // Set month-year header
    monthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;


    // Clear the previous calendar dates
    dates.innerHTML = '';

    // Add empty slots for the days before the 1st of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDiv = document.createElement('div');
        dates.appendChild(emptyDiv);
    }

    // Create calendar days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        // If the day has an event, highlight it
        const eventKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        if (events[eventKey]) {
            dayDiv.classList.add('event');
        }

        dayDiv.addEventListener('click', () => showEventDetails(day, year, month));
        dates.appendChild(dayDiv);
    }

    // Add empty slots for the remaining days after the last date of the month
    for (let i = lastDay; i < 6; i++) {
        const emptyDiv = document.createElement('div');
        dates.appendChild(emptyDiv);
    }
}

    function showEventDetails(day, year, month) {
        const eventKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        if (events[eventKey]) {
            alert(`Event: ${events[eventKey].title}\nDescription: ${events[eventKey].description}`);
        } else {
            const eventTitle = prompt('Enter event title:');
            const eventDescription = prompt('Enter event description:');
            events[eventKey] = { title: eventTitle, description: eventDescription };
            generateCalendar(); // Regenerate the calendar with the new event
        }
    }

    // Event listeners for navigating months
    if(prevButton) prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });

    if(nextButton) nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });

    // Initial calendar generation
    generateCalendar();