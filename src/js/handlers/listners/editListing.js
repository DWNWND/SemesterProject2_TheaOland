import { updateListing, deleteListing, publishListing } from "../../api/requests/_index.js";
import { clearUserFeedback } from "../../ui/userFeedback/_index.js";
import { generateMediaObj, checkNumberOfImg, removeFieldFromArray, addFieldToArray } from "../events/_index.js";

let mediaObjArr = [];

export function listenForAddImg(btn) {
  btn.addEventListener("click", () => {
    addFieldToArray();
  });
}

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

export function listenForDelete(listingID) {
  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    const loaderContainerOnAction = document.getElementById("loaderContainerOnAction");
    loaderContainerOnAction.style.display = "block";

    deleteListing(listingID);
  });
}
