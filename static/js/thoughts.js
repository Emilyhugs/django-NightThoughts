const editButtons = document.querySelectorAll(".btn-edit");
const thoughtText = document.getElementById("id_content");
const thoughtForm = document.getElementById("thoughtForm");
const submitButton = document.getElementById("submitButton");
const modalTitle = document.getElementById("modalTitle");

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('hide.bs.modal', function (event) {
        setTimeout(() => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }, 10); // Small delay to allow the modal updates to happen first
    });
});

// Loop through edit buttons and add event listener
editButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    

    // Get the thought ID from the button
    const thoughtId = button.getAttribute("thought_id");
  

    // Get the content of the thought using the correct ID
    const thoughtContent = document.getElementById(`thoughtContent${thoughtId}`);
    if (thoughtContent) {
      thoughtText.value = thoughtContent.innerText; // Set input value to thought content
    }

    // Change submit button text to 'Update'
    modalTitle.innerText = "Edit Thought";
    submitButton.innerText = "Update";
   

    // Update the form action to send data to the correct update view
    thoughtForm.setAttribute("action", `/update/${thoughtId}/`);

  });
});
