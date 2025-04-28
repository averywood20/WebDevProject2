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