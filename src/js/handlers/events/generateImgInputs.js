import { listenForRemoveImg } from "../listners/_index.js";

const addImgsBtn = document.getElementById("addImgsBtn");
let imagesArray = [];

export function addFieldToArray(imgUrl, imgAlt) {
  const imgId = Math.floor(Math.random() * 10000);
  generateImgFields(imgUrl, imgAlt, imgId);

  const newImage = {
    id: imgId,
  };
  imagesArray.push(newImage);
  checkNumberOfImg();
}

export function removeFieldFromArray(imgFieldID) {
  imagesArray = imagesArray.filter((img) => {
    return img.id !== imgFieldID;
  });
}

export function checkNumberOfImg() {
  const imgArrLen = imagesArray.length;
  if (imgArrLen < 8) {
    addImgsBtn.innerText = "Add images";
    addImgsBtn.classList.remove("no-decoration");
    addImgsBtn.disabled = false;
  }
  if (imgArrLen >= 8) {
    addImgsBtn.innerText = "Max amount of images pr. listing";
    addImgsBtn.classList.add("no-decoration");
    addImgsBtn.disabled = true;
  }
}

export function generateImgFields(url = "", alt = "", imgId) {
  const urlInput = document.createElement("input");
  urlInput.classList.add("url", "form-control");
  urlInput.type = "url";
  urlInput.id = "urlUpload";
  urlInput.name = "url";
  urlInput.value = url;
  const urlLabel = document.createElement("label");
  urlLabel.setAttribute("for", "urlUpload");
  urlLabel.classList.add("new-listing-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
  urlLabel.innerText = "image url";
  const urlField = document.createElement("div");
  urlField.classList.add("form-floating");
  urlField.append(urlInput, urlLabel);

  const altInput = document.createElement("input");
  altInput.classList.add("alt", "form-control");
  altInput.type = "text";
  altInput.id = "altText";
  altInput.name = "alt";
  altInput.maxLength = "120";
  altInput.value = alt;
  const altLabel = document.createElement("label");
  altLabel.setAttribute("for", "altText");
  altLabel.classList.add("new-listing-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
  altLabel.innerText = "image description";
  const altField = document.createElement("div");
  altField.classList.add("form-floating");
  altField.append(altInput, altLabel);

  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("d-flex", "flex-column", "gap-1");
  fieldset.append(urlField, altField);

  const removeBtn = document.createElement("a");
  removeBtn.classList.add("pointer", "text-white", "position-absolute", "top-1", "end-2");
  removeBtn.id = imgId;
  removeBtn.innerText = "delete";
  listenForRemoveImg(removeBtn);

  const li = document.createElement("li");
  li.classList.add("bg-grayish-purple", "p-1", "text-white", "rounded", "position-relative", "bg-opacity-25");
  li.id = imgId;
  li.append(removeBtn, fieldset);

  const imageUpload = document.getElementById("imageUpload");
  imageUpload.append(li);
}
