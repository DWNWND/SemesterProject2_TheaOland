import { updateListing } from "../../api/requests/update.js";
import { deleteListing } from "../../api/requests/delete.js";
import { publishListing } from "../../api/requests/post.js";
import { generateImgInputs } from "../events/_index.js";

let img = 1;

export function listenForAddImages(btn) {
  const addImgsBtn = document.getElementById("addImgsBtn");

  btn.addEventListener("click", () => {
    img++;

    if (img <= 8) {
      generateImgInputs();
    }
    if (img >= 8) {
      addImgsBtn.innerText = "Max amound of images pr. listing";
      addImgsBtn.classList.add("no-decoration");
      addImgsBtn.disabled;
      throw new Error("Max amount of uploaded images is 8.");
    }
  });
}

export function listenForRemoveImg(btn) {
  btn.addEventListener("click", (event) => {
    const imgId = event.target.id;
    const imgToRemove = document.getElementById(imgId);
    imgToRemove.remove();
  });
}

export function listenForDelete(listingID) {
  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    deleteListing(listingID);
  });
}

let mediaObjArr = [];

function generateMediaObj(fieldset) {
  fieldset.forEach((element) => {
    const url = element.querySelector(".url");
    const alt = element.querySelector(".alt");
    const mediaObj = {
      url: url.value,
      alt: alt.value,
    };
    mediaObjArr.push(mediaObj);
  });
}

export async function listenForUpdate(listingID) {
  document.forms.newListing.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newListing = Object.fromEntries(formData.entries());

    const fieldsets = document.querySelectorAll("fieldset");
    generateMediaObj(fieldsets);

    const newListingObj = {
      title: newListing.title,
      description: newListing.description,
      endsAt: newListing.endsAt,
      tags: [],
      media: mediaObjArr,
    };

    updateListing(newListingObj, listingID);
  });
}

export async function listenForPublish() {
  document.forms.newListing.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newListing = Object.fromEntries(formData.entries());
    const newDeadline = new Date(newListing.endsAt);

    const newListingObj = {
      title: newListing.title,
      description: newListing.description,
      endsAt: newDeadline,
      tags: [],
      media: [
        {
          url: newListing.url,
          alt: newListing.alt,
        },
      ],
    };
    publishListing(newListingObj);
  });
}
