const editButtons = document.querySelectorAll(".btn-edit");
const thoughtText = document.getElementById("id_content");
const thoughtForm = document.getElementById("thoughtForm");
const submitButton = document.getElementById("submitButton");
const modalTitle = document.getElementById("modalTitle");
const addThoughtButton = document.getElementById("addThoughtButton");
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


