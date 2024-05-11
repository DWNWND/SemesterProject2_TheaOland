import { listenForRemoveImg } from "../listners/_index.js";
let img = 1;
const imageUpload = document.getElementById("imageUpload");

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
  removeBtn.classList.add("pointer", "text-black", "text-center");
  removeBtn.id = "image" + img;
  removeBtn.innerText = "delete";

  listenForRemoveImg(removeBtn);

  const imgLabel = document.createElement("label");
  imgLabel.innerText = "Image " + img;
  imgLabel.classList.add("text-white", "text-center");
  imgLabel.setAttribute("for", "image" + img);

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("d-flex", "justify-content-between", "p-1");
  headerContainer.append(imgLabel, removeBtn);

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

  imageFields.append(headerContainer, formUrlFloating, formAltFloating);
  imageUpload.append(imageFields);
}
