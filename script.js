// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selection ---
    const form = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const typeSelect = document.getElementById('feedback-type');
    const commentsTextarea = document.getElementById('comments');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const successMessage = document.getElementById('success-message');
    const charCounter = document.getElementById('current-char');

    // --- Helper Functions for Validation ---

    // Shows an error message for a given field
    const showError = (input, message) => {
        const errorSpan = document.getElementById(`${input.id}-error`);
        input.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    };

    // Hides the error message for a given field
    const hideError = (input) => {
        const errorSpan = document.getElementById(`${input.id}-error`);
        input.classList.remove('error');
        errorSpan.style.display = 'none';
    };

    // Checks if a field is empty
    const validateRequired = (input) => {
        if (input.value.trim() === '') {
            showError(input, 'This field is required.');
            return false;
        }
        hideError(input);
        return true;
    };

    // Validates email format using a simple regex
    const validateEmail = () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError(emailInput, 'This field is required.');
            return false;
        }
        if (!emailRegex.test(email)) {
            showError(emailInput, 'Please enter a valid email address.');
            return false;
        }
        hideError(emailInput);
        return true;
    };
    
    // Validates star rating selection
    const validateRating = () => {
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        const ratingErrorSpan = document.getElementById('rating-error');
        if (!selectedRating) {
            ratingErrorSpan.textContent = 'Please select a rating.';
            ratingErrorSpan.style.display = 'block';
            return false;
        }
        ratingErrorSpan.style.display = 'none';
        return true;
    };


    // --- Event Listeners ---

    // Character counter for textarea
    commentsTextarea.addEventListener('input', () => {
        const currentLength = commentsTextarea.value.length;
        charCounter.textContent = currentLength;
    });

    // Real-time validation on blur (when user clicks away from an input)
    nameInput.addEventListener('blur', () => validateRequired(nameInput));
    emailInput.addEventListener('blur', validateEmail);
    typeSelect.addEventListener('blur', () => validateRequired(typeSelect));
    commentsTextarea.addEventListener('blur', () => validateRequired(commentsTextarea));

    // Form submission handler
    form.addEventListener('submit', (event) => {
        // Prevent the default form submission (page reload)
        event.preventDefault();

        // Perform all validations
        const isNameValid = validateRequired(nameInput);
        const isEmailValid = validateEmail();
        const isTypeValid = validateRequired(typeSelect);
        const isRatingValid = validateRating();
        const isCommentsValid = validateRequired(commentsTextarea);

        // If all fields are valid, show success message
        if (isNameValid && isEmailValid && isTypeValid && isRatingValid && isCommentsValid) {
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // You can also log the form data
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                type: typeSelect.value,
                rating: document.querySelector('input[name="rating"]:checked').value,
                comments: commentsTextarea.value
            };
            console.log('Form Submitted Data:', formData);
        }
    });
});