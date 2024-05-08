import { navTemplate } from "../templates/nav.js";
import { load } from "../storage/index.js";
import { publishListing } from "../api/requests/post.js";
import { populateEditForm } from "../events/listners/populateEditForm.js";
import { updateListing } from "../api/requests/update.js";

let img = 1;
const imageUpload = document.getElementById("imageUpload");
const addImgsBtn = document.getElementById("addImgsBtn");
const profile = load("profile");
const username = profile.name;

//getting the IDs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("key");

export async function generateEdit() {
  try {
    navTemplate(username);
    addMoreImages(addImgsBtn);
    if (listingID) {
      const requestListing = "../api/requests/get.js";
      const { get } = await import(requestListing);
      const listing = await get("singleListing", listingID);

      if (!listing.endsAt) {
        const deadlineInput = document.getElementById("deadlineInput");
        deadlineInput.required;
      }

      populateEditForm(listing);
      updateEditedListing(listingID);
    }
    if (!listingID) {
      publishNewListing();
    }
  } catch (error) {
    console.log(error);
  }
}

function addMoreImages(btn) {
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

function removeImages(btn) {
  btn.addEventListener("click", (event) => {
    const imgId = event.target.id;
    const imgToRemove = document.getElementById(imgId);
    imgToRemove.remove();
  });
}

export function generateImgInputs(url = "", alt = "") {
  const imageFieldsets = document.querySelectorAll("fieldset");
  const amountOfFieldsets = imageFieldsets.length;
  if (!amountOfFieldsets) {
    img = 1;
  }
  const imageFields = document.createElement("fieldset");
  imageFields.id = "image" + img;
  // imageFields.name = "media"
  imageFields.classList.add("d-flex", "flex-column", "gap-1", "p-1", "bg-grayish-purple", "media-fieldsets");

  const removeBtn = document.createElement("a");
  removeBtn.id = "image" + img;
  removeBtn.innerText = "remove img";

  removeImages(removeBtn);

  const imgLabel = document.createElement("label");
  imgLabel.innerText = "Image " + img;
  imgLabel.classList.add("text-white", "text-center");
  imgLabel.setAttribute("for", "image" + img);

  const urlInput = document.createElement("input");
  urlInput.classList.add("url", "form-control");
  urlInput.type = "url";
  urlInput.id = "urlUpload";
  urlInput.name = "url";
  urlInput.value = url;

  const altInput = document.createElement("input");
  altInput.classList.add("alt", "form-control");
  altInput.type = "text";
  altInput.id = "altText";
  altInput.name = "alt";
  altInput.maxLength = "120";
  altInput.value = alt;

  const urlLabel = document.createElement("label");
  urlLabel.setAttribute("for", "urlUpload");
  urlLabel.classList.add("new-listing-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
  urlLabel.innerText = "image url";

  const altLabel = document.createElement("label");
  altLabel.setAttribute("for", "altText");
  altLabel.classList.add("new-listing-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
  altLabel.innerText = "image description";

  const formUrlFloating = document.createElement("div");
  formUrlFloating.classList.add("form-floating");

  const formAltFloating = document.createElement("div");
  formAltFloating.classList.add("form-floating");

  formUrlFloating.append(urlInput, urlLabel);
  formAltFloating.append(altInput, altLabel);

  imageFields.append(imgLabel, removeBtn, formUrlFloating, formAltFloating);
  imageUpload.append(imageFields);
}

async function publishNewListing() {
  document.forms.newListing.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newListing = Object.fromEntries(formData.entries());

    const newListingObj = {
      title: newListing.title,
      description: newListing.description,
      endsAt: newListing.endsAt,
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

async function updateEditedListing(listingID) {
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
