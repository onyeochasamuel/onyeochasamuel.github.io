// This script handles the form submission using the EmailJS library.

// Initialize EmailJS with your Public Key
// This key connects your website to your EmailJS account.
(function() {
    emailjs.init({
        publicKey: 'uXH_8xAhzNZmwgGwh',
    });
})();

// Get the form element by its ID
const contactForm = document.getElementById('contactForm');
// Get the new status message container
const statusMessageDiv = document.getElementById('statusMessage');

// Add an event listener to the form's submit event
contactForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior which would reload the page
    event.preventDefault();

    // Select the submit button and change its text to provide feedback to the user
    const sendButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = sendButton.innerHTML;
    sendButton.innerHTML = 'Sending...';
    sendButton.disabled = true; // Disable the button to prevent multiple submissions

    // Define your EmailJS Service and Template IDs
    // These IDs tell EmailJS which service and template to use for the email.
    const serviceID = 'service_6im23md';
    const templateID = 'template_bdo2ufo';

    // Use EmailJS to send the form data
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // This code runs on successful email send
            console.log('SUCCESS!');
            statusMessageDiv.textContent = 'Message sent successfully!';
            statusMessageDiv.className = 'message-container success-message';
            contactForm.reset(); // Clear the form fields
        }, (error) => {
            // This code runs if the email send fails
            console.error('FAILED...', error);
            statusMessageDiv.textContent = 'An error occurred. Please try again.';
            statusMessageDiv.className = 'message-container error-message';
        })
        .finally(() => {
            // This code runs whether the send was successful or not
            // Restore the button to its original state
            sendButton.innerHTML = originalButtonText;
            sendButton.disabled = false;
        });
});

// A helper function to display a custom pop-up message to the user
function showCustomMessage(message, color) {
    const messageBox = document.createElement('div');
    messageBox.className = 'modal';
    messageBox.innerHTML = `
        <div class="modal-content">
            <p style="color: ${color};">${message}</p>
            <button id="close-message" class="modal-close-btn">Close</button>
        </div>
    `;
    document.body.appendChild(messageBox);

    // Add an event listener to the close button to remove the message
    document.getElementById('close-message').addEventListener('click', () => {
        document.body.removeChild(messageBox);
    });
}
