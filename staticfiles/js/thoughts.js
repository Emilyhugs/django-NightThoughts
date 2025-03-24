const editButtons = document.querySelectorAll(".btn-edit");
const thoughtText = document.getElementById("id_content");
const thoughtForm = document.getElementById("thoughtForm");
const submitButton = document.getElementById("submitButton");
const modalTitle = document.getElementById("modalTitle");
const addThoughtButton = document.getElementById("addThoughtButton");
const categoryField = document.getElementById("id_category");
const addThoughtModal = document.getElementById('addThoughtModal');

// Reset form function to ensure consistent state
function resetForm() {
    thoughtText.value = ""; 
    if (categoryField) {
        categoryField.value = "";
    }
       
    // Reset mood field
    const moodField = document.getElementById("id_mood");
    if (moodField) {
        moodField.value = ""; // Reset to default or empty
    }
    modalTitle.innerText = "What's on your mind?";
    submitButton.innerText = "Save Thought";
    thoughtForm.setAttribute("action", "/create/");
}

document.addEventListener("DOMContentLoaded", function () {
    if (addThoughtModal) {
        // Reset form when modal is hidden
        addThoughtModal.addEventListener('hidden.bs.modal', resetForm);

            // Ensure focus on text area when modal is shown
            addThoughtModal.addEventListener('shown.bs.modal', () => {
                if (thoughtText) {
                    thoughtText.focus();
                }
            });
        }
       
       // Delay to ensure focus is removed after modal is hidden
       document.addEventListener('hide.bs.modal', function (event) {
        setTimeout(() => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }, 10); 
    });
});

// Single event listener with event delegation
document.addEventListener("click", (e) => {
    // For edit buttons
    if (e.target.classList.contains("btn-edit")) {
        resetForm();
        
        const thoughtId = e.target.getAttribute("thought_id");
        const thoughtContent = document.getElementById(`thoughtContent${thoughtId}`);
        const thoughtCategory = document.getElementById(`thoughtCategory${thoughtId}`);
        const thoughtMood = document.getElementById(`thoughtMood${thoughtId}`);

        if (thoughtContent) {
            thoughtText.value = thoughtContent.innerText; 
        }
        if (thoughtCategory && categoryField) {
            categoryField.value = thoughtCategory.innerText.trim();
        }

        const moodField = document.getElementById("id_mood");
        if (thoughtMood && moodField) {
            moodField.value = thoughtMood.value;
        }
        
        modalTitle.innerText = "Edit Thought";
        submitButton.innerText = "Update";
        thoughtForm.setAttribute("action", `/update/${thoughtId}/`);

        // Ensure modal is open and focused
        const bootstrapModal = bootstrap.Modal.getInstance(addThoughtModal) || new bootstrap.Modal(addThoughtModal);
        bootstrapModal.show();
    }
    // For add button
    else if (e.target.id === "addThoughtButton" || e.target.closest("#addThoughtButton")) {
        resetForm();
    }
    // For delete button
    else if (e.target.classList.contains("btn-delete")) {
        let thoughtId = e.target.getAttribute("thought_id");
        document.getElementById("deleteConfirm").href = `/delete/${thoughtId}/`;
        let deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
        deleteModal.show();
    }
});

///Function to close the alert after 5 seconds otherwise it will stay there until the user clicks it - bad ux. 

document.addEventListener("DOMContentLoaded", function() {
    // Select all alerts with the class .alert
    const alerts = document.querySelectorAll('.alert');

    // Loop through each alert and set a timeout to close it
    alerts.forEach(function(alert) {
        // Set the timeout (e.g., 5 seconds = 5000 milliseconds)
        setTimeout(function() {
            // Check if the alert is still visible before attempting to close it
            if (alert) {
                const closeButton = alert.querySelector('.btn-close');
                if (closeButton) {
                    closeButton.click(); // Simulate a click on the close button to dismiss the alert
                }
            }
        }, 5000); // Adjust the time (5000 ms = 5 seconds) as needed
    });
});

///Function to focus on the username input field when the page loads for better UI experience
document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("id_username") || document.getElementById("id_login");
    if (usernameInput) {
      usernameInput.focus();
    }
  });

/// Function to show updated at value when the user updates the thought
document.addEventListener("DOMContentLoaded", function () {
    // Select all thought cards
    const thoughtCards = document.querySelectorAll(".thought-card");

    thoughtCards.forEach(function (card) {
        // Get the created-at and updated-at elements within the card
        const createdAtElement = card.querySelector(".created-at");
        const updatedAtElement = card.querySelector(".updated-at");

        if (createdAtElement && updatedAtElement) {
            // Parse the text content of the created-at and updated-at elements into Date objects
            const createdAt = new Date(createdAtElement.textContent);
            const updatedAt = new Date(updatedAtElement.textContent);

            // Check if updated_at is different from created_at
            if (updatedAt > createdAt) {
                createdAtElement.style.display = "none"; // Hide the created-at element if updated
                updatedAtElement.style.display = "block"; // Show the updated-at element
            } else {
                updatedAtElement.style.display = "none"; // Hide the updated-at element if not updated
            }
        }
    });});

  //This is a function to add voice input to the thought textarea. It uses the generic Web Speech API to convert speech to text.

document.addEventListener('DOMContentLoaded', () => {
    const startVoiceInputBtn = document.getElementById('start-voice-input');
    const thoughtTextarea = document.getElementById('id_content');
    const voiceStatus = document.getElementById('voice-status');

    // Check browser support
    if (!('webkitSpeechRecognition' in window)) {
        if (startVoiceInputBtn) {
            startVoiceInputBtn.disabled = true;
            voiceStatus.textContent = 'Speech recognition not supported';
        }
        return;
    }

    // Create speech recognition instance
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Voice input button click handler
    startVoiceInputBtn.addEventListener('click', () => {
        try {
            recognition.start();
            startVoiceInputBtn.disabled = true;
            voiceStatus.textContent = 'Listening...';
            startVoiceInputBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> Listening';
        } catch (e) {
            voiceStatus.textContent = 'Error starting voice input';
            console.error(e);
        }
    });

    // Speech recognition result handler
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        
        // Append or replace based on current content
        if (thoughtTextarea.value) {
            thoughtTextarea.value += ' ' + transcript;
        } else {
            thoughtTextarea.value = transcript;
        }

        // Reset UI
        voiceStatus.textContent = 'Your thought has been added';
        startVoiceInputBtn.disabled = false;
        startVoiceInputBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    };

    // Handle errors
    recognition.onerror = (event) => {
        voiceStatus.textContent = 'Error: ' + event.error;
        startVoiceInputBtn.disabled = false;
        startVoiceInputBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    };

    // Handle end of speech recognition
    recognition.onend = () => {
        startVoiceInputBtn.disabled = false;
        startVoiceInputBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        
        // Clear status after a few seconds
        setTimeout(() => {
            voiceStatus.textContent = '';
        }, 3000);
    };
});