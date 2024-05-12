import { countdownTimer } from "../../ux/components/countdownTimer.js";
import { addFieldToArray } from "./_index.js";

export async function populateEditForm(listing) {
  const editForm = document.forms.newListing;

  if (editForm) {
    const button = document.getElementById("submit");
    button.disabled = true;

    if (listing.title) {
      editForm.title.value = listing.title;
    }
    if (listing.description) {
      editForm.description.value = listing.description;
    }
    // if (listing.tags) {
    //   console.log(tags);
    //   editForm.tags.value = tags;
    // }
    if (listing.endsAt) {
      const deadlineLabel = document.getElementById("deadlineLabel");
      const deadlineInput = document.getElementById("deadlineInput");
      const deadlineContainer = document.getElementById("deadlineContainer");

      deadlineLabel.innerText = "deadline:";
      deadlineInput.style.display = "none";

      const setDeadline = document.createElement("p");

      const countdownLabel = document.createElement("div");
      countdownLabel.classList.add("new-listing-form-labels", "uppercase", "extra-bold", "text-grayish-purple");
      countdownLabel.innerText = "countdown:";
      const setCountdown = document.createElement("p");

      const deadline = new Date(listing.endsAt);
      const deadlineString = deadline.toLocaleString();

      setDeadline.innerText = deadlineString;

      countdownTimer(deadline, setCountdown);

      deadlineContainer.append(setDeadline, countdownLabel, setCountdown);
    }

    if (listing.media) {
      listing.media.forEach((image) => {
        addFieldToArray(image.url, image.alt);
      });
    }
    button.disabled = false;
  }
}
