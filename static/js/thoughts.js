const editButtons = document.getElementsByClassName("btn-edit");
const thoughtText = document.getElementById("id_content");
const thoughtForm = document.getElementById("thoughtForm");
const submitButton = document.getElementById("submitButton");

/**
* Initializes edit functionality for the provided edit buttons.
* 
* For each button in the `editButtons` collection:
* - Retrieves the associated thought's ID upon click.
* - Fetches the content of the corresponding thought.
* - Populates the `thoughtText` input/textarea with the thought's content for editing.
* - Updates the submit button's text to "Update".
* - Sets the form's action attribute to the `update_thought/{thoughtId}` endpoint.
*/
// for (let button of editButtons) {
//   button.addEventListener("click", (e) => {
//     let thoughtId = e.target.getAttribute("thought_id");
//     let thoughtContent = document.getElementById(`thought${thoughtId}`).innerText;
//     thoughtText.value = thoughtContent;
//     submitButton.innerText = "Update";
//     thoughtForm.setAttribute("action", `update/${thoughtId}`);
//   });
// }

console.log("Edit buttons:", editButtons);
console.log("Thought text area:", thoughtText);
console.log("Thought form:", thoughtForm);
console.log("Submit button:", submitButton);

for (let button of editButtons) {
  button.addEventListener("click", (e) => {
    console.log("Edit button clicked:", e.target);

    let thoughtId = e.target.getAttribute("thought_id");
    console.log("Thought ID:", thoughtId);

    let thoughtContent = document.getElementById(`thought${thoughtId}`);
    if (thoughtContent) {
      console.log("Thought content:", thoughtContent.innerText);
      thoughtText.value = thoughtContent.innerText;
    } else {
      console.error(`Element with ID thought${thoughtId} not found.`);
    }

    submitButton.innerText = "Update";
    thoughtForm.setAttribute("action", `update/${thoughtId}`);
    console.log("Form action updated to:", thoughtForm.getAttribute("action"));
  });
}