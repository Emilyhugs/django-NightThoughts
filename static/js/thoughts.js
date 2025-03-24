const editButtons = document.querySelectorAll(".btn-edit");
const thoughtText = document.getElementById("id_content");
const thoughtForm = document.getElementById("thoughtForm");
const submitButton = document.getElementById("submitButton");
const modalTitle = document.getElementById("modalTitle");
const addThoughtButton = document.getElementById("addThoughtButton");
const categoryField = document.getElementById("id_category"); // Category field in modal

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
 // Reset form when modal is hidden to prevent state persistence. Without this there would be issues with aria attributes and focus which is misleading for screen-reader users.
document.addEventListener("DOMContentLoaded", function () {
    const addThoughtModal = document.getElementById('addThoughtModal');
    if (addThoughtModal) {
        addThoughtModal.addEventListener('hidden.bs.modal', function () {
            resetForm();
        });
    }
// Delay to ensure focus is removed after modal is hidden.
    document.addEventListener('hide.bs.modal', function (event) {
        setTimeout(() => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }, 10); 
    });
});

/// Use a single event listener with event delegation.This event listener is for the edit button. It then dynamically sets up the modal for editing.
document.addEventListener("click", (e) => {
    // For edit buttons
    if (e.target.classList.contains("btn-edit")) {
        // Reset form first to clear any previous state
        resetForm();
        
        // Then set up for editing
        const thoughtId = e.target.getAttribute("thought_id");
        const thoughtContent = document.getElementById(`thoughtContent${thoughtId}`);
        const thoughtCategory = document.getElementById(`thoughtCategory${thoughtId}`);
        const thoughtMood = document.getElementById(`thoughtMood${thoughtId}`);

//This bit of code pre-fills the textbox and category when the user is editing a thought.
        if (thoughtContent) {
            thoughtText.value = thoughtContent.innerText; 
        }
        if (thoughtCategory && categoryField) {
            categoryField.value = thoughtCategory.innerText.trim(); // Prefill category
        }
      // This bit of code pre-fills the mood when the user is editing a thought.
    const moodField = document.getElementById("id_mood");
    if (thoughtMood && moodField) {
        moodField.value = thoughtMood.value;
    }
        modalTitle.innerText = "Edit Thought";
        submitButton.innerText = "Update";
        thoughtForm.setAttribute("action", `/update/${thoughtId}/`);

    // Ensure that the modal is open and then focus on the textbox for both editing and adding thoughts. 
    const addThoughtModal = document.getElementById("addThoughtModal");
    const bootstrapModal = bootstrap.Modal.getInstance(addThoughtModal) || new bootstrap.Modal(addThoughtModal);

    bootstrapModal.show(); // Ensure the modal is shown
    addThoughtModal.addEventListener("shown.bs.modal", () => {
        if (thoughtText) {
            thoughtText.focus(); // Focus the textbox (input/textarea) after the modal is fully rendered
        }
    });
}


    // For add button
    else if (e.target.id === "addThoughtButton" || e.target.closest("#addThoughtButton")) {
        // Reset form to ensure clean state
        resetForm();
    }
    // This gets the delete modal when you click the delete button
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