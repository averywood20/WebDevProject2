'use strict';

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