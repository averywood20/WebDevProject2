'use strict';
 
// Carousel Implementation
const leftbtn = document.querySelector('.left');
const rightbtn = document.querySelector('.right');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const carouselSize = carouselItems.length;
const navContainer = document.querySelector('.carousel-navigation');

// Adding event listeners for the carousel 
if(leftbtn) leftbtn.addEventListener('click', swipe);
if(rightbtn) rightbtn.addEventListener('click', swipe);
if(navContainer) navContainer.addEventListener('click', swipe);

// Function to move through the carousel
function swipe(e) {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentNavItem = document.querySelector('.nav-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex;

    if (e.currentTarget.classList.contains('left')) {
        if (currentIndex === 0) {
            nextIndex = carouselSize - 1;
        } else {
            nextIndex = currentIndex - 1;
        }

    } else if (e.currentTarget.classList.contains('right')) {
        if (currentIndex === carouselSize - 1) {
             nextIndex = 0
        } else {
             nextIndex = currentIndex + 1;
        }

    } else {
        if (e.currentTarget.classList.contains('active')) {
            return;
        } else {
            const clickedNavIndex = navItems.indexOf(e.target);
            nextIndex = clickedNavIndex
        }
    }
    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');
}

// Daily Bible Verse Implementation
const verses = [
    { text: '"For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope."', reference: 'Jeremiah 29:11', context: 'God is reminding His people that He has good plans for them, even in the midst of challenges.' },
    { text: '"The Lord is my shepherd; I shall not want."', reference: 'Psalm 23:1', context: 'A statement of trust in God\'s provision and care.' },
    { text: '"For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."', reference: 'John 3:16', context: 'This verse emphasizes God\'s immense love for humanity and His gift of salvation through Jesus.' },
    { text: '"I can do all things through him who strengthens me."', reference: 'Philippians 4:13', context: 'Paul encourages believers that they can endure any situation with Christ\'s strength.' }
];

// Generate a random index and update the verse content
const today = new Date();
const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
const verseIndex = dayOfYear % verses.length;
const verse = verses[verseIndex];
const verseContent = document.getElementById('verse-content');

if (verseContent) verseContent.innerHTML = `<span class="verse-text" title="Context:${verse.context}">"${verse.text}" - ${verse.reference}</span>`;

// Having the form reveal a hidden Modal and clear after submission 
const form = document.getElementById('prayer-form');
const modal = document.getElementById('submission-modal');
const closeModal = document.getElementById('close-modal');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset the form fields
        form.reset();

        // Show the submission message
        modal.classList.remove('hidden');
    });
}

if (closeModal) {
    // When you hit the X the modal becomes hidden 
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    })
}


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