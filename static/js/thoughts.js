const editButtons = document.querySelectorAll(".btn-edit");
const thoughtText = document.getElementById("id_content");
const thoughtForm = document.getElementById("thoughtForm");
const submitButton = document.getElementById("submitButton");
const modalTitle = document.getElementById("modalTitle");
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const deleteButtons = document.getElementsByClassName("btn-delete");
const deleteConfirm = document.getElementById("deleteConfirm");

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('hide.bs.modal', function (event) {
        setTimeout(() => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }, 10); // Small delay to allow the modal updates to happen first
    });
});
const addThoughtButton = document.getElementById("addThoughtButton"); // Ensure this is your "Add Thought" button

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-edit")) {
        // Editing an existing thought
        const thoughtId = e.target.getAttribute("thought_id");
        const thoughtContent = document.getElementById(`thoughtContent${thoughtId}`);

        if (thoughtContent) {
            thoughtText.value = thoughtContent.innerText;
        }

        modalTitle.innerText = "Edit Thought";
        submitButton.innerText = "Update";
        thoughtForm.setAttribute("action", `/update/${thoughtId}/`);
    } 
    
    else if (e.target.id === "addThoughtButton") {
        // Adding a new thought
        modalTitle.innerText = "Add New Thought";
        submitButton.innerText = "Save"; // or "Add"
        thoughtText.value = ""; // Clear the input
        thoughtForm.setAttribute("action", "/create/");
    }
});

// // Loop through edit buttons and add event listener
// editButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
    

//     // Get the thought ID from the button
//     const thoughtId = button.getAttribute("thought_id");
  

//     // Get the content of the thought using the correct ID
//     const thoughtContent = document.getElementById(`thoughtContent${thoughtId}`);
//     if (thoughtContent) {
//       thoughtText.value = thoughtContent.innerText; // Set input value to thought content
//     }

//     // Change submit button text to 'Update'
//     modalTitle.innerText = "Edit Thought";
//     submitButton.innerText = "Update";
   

//     // Update the form action to send data to the correct update view
//     thoughtForm.setAttribute("action", `/update/${thoughtId}/`);

//   });
// });

/**
* Initializes deletion functionality for the provided delete buttons.
* 
* For each button in the `deleteButtons` collection:
* - Retrieves the associated thought's ID upon click.
* - Updates the `delete_thought` link's href to point to the 
* deletion endpoint for the specific comment.
* - Displays a confirmation modal (`deleteModal`) to prompt 
* the user for confirmation before deletion.
*/
for (let button of deleteButtons) {
    button.addEventListener("click", (e) => {
      let thoughtId = e.target.getAttribute("thought_id");
      deleteConfirm.href = `/delete/${thoughtId}/`; // Matches Django pattern
      deleteModal.show();
    });
  }