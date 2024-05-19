import { updateListing, deleteListing, publishListing } from "../../api/requests/_index.js";
import { clearUserFeedback } from "../../ui/userFeedback/_index.js";
import { generateMediaObj, checkNumberOfImg, removeFieldFromArray, addFieldToArray } from "../events/_index.js";

let mediaObjArr = [];

/**
 * The function listens for an event to add a image field the image array
 *
 * @param {string} btn The btn that triggers the event
 * @uses addFieldToArray To add a new image field to the image array
 */
export function listenForAddImg(btn) {
  btn.addEventListener("click", () => {
    addFieldToArray();
  });
}

/**
 * The function listens for an event to remove a image field from the image array
 *
 * @param {string} btn The btn that triggers the event
 * @uses removeFieldFromArray To remove a image field from the image array
 * @uses checkNumberOfImg To check that theres no more than 8 images in the array
 */
export function listenForRemoveImg(btn) {
  btn.addEventListener("click", (event) => {
    const imgId = event.target.id;

    const parsedId = parseInt(imgId);
    removeFieldFromArray(parsedId);

    const imgToRemove = document.getElementById(imgId);
    imgToRemove.remove();

    checkNumberOfImg();
  });
}

/**
 * The function makes a new listing object out of the information in the update form and sends it to the server.
 *
 * @param {string} listingID The id of the listing that is being updated
 * @uses generateMediaObj To generate the media object to be added to the listing object
 * @uses updateListing Sends the new object to the server
 * @uses clearUserFeedback Clears the user feedback if there is any and the user clicks somewhere on the page
 */
export async function listenForUpdate(listingID) {
  const publishBtn = document.getElementById("submit");
  const userFeedbackContainer = document.getElementById("feedbackContainerOnAction");

  document.forms.newListing.addEventListener("submit", (event) => {
    publishBtn.disabled = true;

    const loaderContainerOnAction = document.getElementById("loaderContainerOnAction");
    loaderContainerOnAction.style.display = "block";

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newListing = Object.fromEntries(formData.entries());

    const fieldsets = document.querySelectorAll("fieldset");
    generateMediaObj(mediaObjArr, fieldsets);

    const tags = newListing.tags;
    const newTags = tags.split(",");
    const trimmedTagsArr = newTags.map((tag) => tag.trim());

    const newListingObj = {
      title: newListing.title,
      description: newListing.description,
      endsAt: newListing.endsAt,
      tags: trimmedTagsArr,
      media: mediaObjArr,
    };

    updateListing(newListingObj, listingID);
  });
  clearUserFeedback(userFeedbackContainer, publishBtn);
}

/**
 * The function makes a new listing object out of the information in the new listing form and sends it to the server.
 *
 * @uses generateMediaObj To generate the media object to be added to the listing object
 * @uses publishListing Sends the new object to the server
 * @uses clearUserFeedback Clears the user feedback if there is any and the user clicks somewhere on the page
 */
export async function listenForPublish() {
  const publishBtn = document.getElementById("submit");
  const userFeedbackContainer = document.getElementById("feedbackContainerOnAction");

  document.forms.newListing.addEventListener("submit", (event) => {
    publishBtn.disabled = true;

    const loaderContainerOnAction = document.getElementById("loaderContainerOnAction");
    loaderContainerOnAction.style.display = "block";

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newListing = Object.fromEntries(formData.entries());
    const newDeadline = new Date(newListing.endsAt);

    const fieldsets = document.querySelectorAll("fieldset");
    generateMediaObj(mediaObjArr, fieldsets);

    const newListingObj = {
      title: newListing.title,
      description: newListing.description,
      endsAt: newDeadline,
      tags: [],
      media: mediaObjArr,
    };
    publishListing(newListingObj);
  });
  clearUserFeedback(userFeedbackContainer, publishBtn);
}

/**
 * The function listens for a delete listing event and deletes the spesific listing from the server
 * @uses deleteListing Deletes the listing from the server
 */
export function listenForDelete(listingID) {
  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    const loaderContainerOnAction = document.getElementById("loaderContainerOnAction");
    loaderContainerOnAction.style.display = "block";

    deleteListing(listingID);
  });
}
