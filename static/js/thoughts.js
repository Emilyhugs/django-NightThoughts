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
    modalTitle.innerText = "What's on your mind?";
    submitButton.innerText = "Save Thought";
    thoughtForm.setAttribute("action", "/create/");
}

document.addEventListener("DOMContentLoaded", function () {
    // Reset form when modal is hidden to prevent state persistence
    const addThoughtModal = document.getElementById('addThoughtModal');
    if (addThoughtModal) {
        addThoughtModal.addEventListener('hidden.bs.modal', function () {
            resetForm();
        });
    }

    document.addEventListener('hide.bs.modal', function (event) {
        setTimeout(() => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }, 10); // Small delay to allow the modal updates to happen first
    });
});

// Use a single event listener with event delegation
document.addEventListener("click", (e) => {
    // For edit buttons
    if (e.target.classList.contains("btn-edit")) {
        // Reset form first to clear any previous state
        resetForm();
        
        // Then set up for editing
        const thoughtId = e.target.getAttribute("thought_id");
        const thoughtContent = document.getElementById(`thoughtContent${thoughtId}`);
        const thoughtCategory = document.getElementById(`thoughtCategory${thoughtId}`);

        if (thoughtContent) {
            thoughtText.value = thoughtContent.innerText; // Prefill thought text
        }
        if (thoughtCategory && categoryField) {
            categoryField.value = thoughtCategory.innerText.trim(); // Prefill category
        }

        modalTitle.innerText = "Edit Thought";
        submitButton.innerText = "Update";
        thoughtForm.setAttribute("action", `/update/${thoughtId}/`);
    } 
    // For add button
    else if (e.target.id === "addThoughtButton" || e.target.closest("#addThoughtButton")) {
        // Reset form to ensure clean state
        resetForm();
    }
    // For delete buttons
    else if (e.target.classList.contains("btn-delete")) {
        let thoughtId = e.target.getAttribute("thought_id");
        document.getElementById("deleteConfirm").href = `/delete/${thoughtId}/`;
        let deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
        deleteModal.show();
    }
});

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