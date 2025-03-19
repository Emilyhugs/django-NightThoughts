/* jshint esversion: 6 */

const thoughtText = document.getElementById("id_content");
const thoughtForm = document.getElementById("thoughtForm");
const submitButton = document.getElementById("submitButton");
const modalTitle = document.getElementById("modalTitle");
const categoryField = document.getElementById("id_category"); // Category field in modal

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('hide.bs.modal', function (event) {
        setTimeout(() => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }, 10); // Small delay to allow the modal updates to happen first
    });
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-edit")) {
        // Editing an existing thought
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
    
    else if (e.target.id === "addThoughtButton") {
        // Adding a new thought
        modalTitle.innerText = "Add New Thought";
        submitButton.innerText = "Save Thought";
        thoughtText.value = ""; // Clear thought text field
        thoughtForm.setAttribute("action", "/create/");
        
        if (categoryField) {
            categoryField.value = ""; // Clear category field
        }
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
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
        }, 5000); // Adjust the time (3000 ms = 3 seconds) as needed
    });
});