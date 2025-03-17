const editButtons = document.querySelectorAll(".btn-edit");
const thoughtText = document.getElementById("id_content");
const thoughtForm = document.getElementById("thoughtForm");
const submitButton = document.getElementById("submitButton");
const addThoughtModal = document.getElementById("addThoughtModal");
const addThoughtButton = document.querySelector("[data-bs-target='#addThoughtModal']");

// Ensure the modal gets focus when opened to prevent accessibility issues.
addThoughtModal.addEventListener("shown.bs.modal", () => {
    addThoughtModal.focus();
  });

  // Ensure focus is returned to the button after the modal is closed to prevent accessibility issues.
addThoughtModal.addEventListener("hidden.bs.modal", () => {
    addThoughtButton.focus();
});

// Loop through edit buttons and add event listener
editButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("Edit button clicked:", e.target);

    // Get the thought ID from the button
    const thoughtId = button.getAttribute("thought_id");
    console.log("Thought ID:", thoughtId);

    // Get the content of the thought using the correct ID
    const thoughtContent = document.getElementById(`thoughtContent${thoughtId}`);
    if (thoughtContent) {
      console.log("Thought content:", thoughtContent.innerText);
      thoughtText.value = thoughtContent.innerText; // Set input value
    } else {
      console.error(`Element with ID thoughtContent${thoughtId} not found.`);
    }

    // Change submit button text to 'Update'
    modalTitle.innerText = "Edit Thought";
    submitButton.innerText = "Update";
   

    // Update the form action to send data to the correct update view
    thoughtForm.setAttribute("action", `/update/${thoughtId}/`);
    console.log("Form action updated to:", thoughtForm.getAttribute("action"));
  });
});
