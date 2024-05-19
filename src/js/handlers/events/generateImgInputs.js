import { listenForRemoveImg } from "../listners/_index.js";

let imagesArray = [];

/**
 * The function adds a image to the image array, it also adds a image field for each image.
 *
 * @param {string} imgUrl The image url
 * @param {string} imgAlt The image alt text
 *
 * @uses generateImgFields To generate a HTML field for each image
 * @uses checkNumberOfImg To make sure its not more than 8 images in the array
 */
export function addFieldToArray(imgUrl, imgAlt) {
  const imgId = Math.floor(Math.random() * 10000);
  generateImgFields(imgUrl, imgAlt, imgId);

  const newImage = {
    id: imgId,
  };
  imagesArray.push(newImage);
  checkNumberOfImg();
}

/**
 * The function removes a image to the image array, it also adds a image field for each image.
 * @param {string} imgFieldID The ID of the image that should be removed
 */
export function removeFieldFromArray(imgFieldID) {
  imagesArray = imagesArray.filter((img) => {
    return img.id !== imgFieldID;
  });
}

/**
 * The function checks that theres no more than 8 images in the image array
 */
export function checkNumberOfImg() {
  const addImgsBtn = document.getElementById("addImgsBtn");
  const imgArrLen = imagesArray.length;
  if (imgArrLen < 8) {
    addImgsBtn.innerText = "Add images";
    addImgsBtn.disabled = false;
  }
  if (imgArrLen >= 8) {
    addImgsBtn.innerText = "Max amount of images pr. listing";
    addImgsBtn.disabled = true;
  }
}

/**
 * The function generates a "fieldset" for each image in the update or new listing form and adds it to the DOM.
 * @param {string} url The image url
 * @param {string} alt The image alt text
 * @param {number} imgId The image id
 */
export function generateImgFields(url = "", alt = "", imgId) {
  const urlInput = document.createElement("input");
  urlInput.classList.add("url", "form-control");
  urlInput.type = "url";
  urlInput.id = "urlUpload";
  urlInput.name = "url";
  urlInput.value = url;
  const urlLabel = document.createElement("label");
  urlLabel.setAttribute("for", "urlUpload");
  urlLabel.classList.add("text-uppercase", "semi-bold", "text-grayish-purple");
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
  altLabel.classList.add("text-uppercase", "semi-bold", "text-grayish-purple");
  altLabel.innerText = "image description";
  const altField = document.createElement("div");
  altField.classList.add("form-floating");
  altField.append(altInput, altLabel);

  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("d-flex", "flex-column", "gap-1");
  fieldset.append(urlField, altField);

  const removeBtn = document.createElement("div");
  removeBtn.classList.add("pointer", "text-black", "d-block", "p-2", "text-decoration-underline");
  removeBtn.id = imgId;
  removeBtn.innerText = "remove";
  listenForRemoveImg(removeBtn);

  const li = document.createElement("li");
  li.classList.add("bg-grayish-purple", "p-1", "text-grayish-purple", "rounded", "bg-opacity-25");
  li.id = imgId;
  li.append(removeBtn, fieldset);

  const imageUpload = document.getElementById("imageUpload");
  imageUpload.append(li);
}
