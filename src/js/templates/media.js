/**
 * The function generates a "img" element for the first image in the array passed to it
 *
 * @param {Object[]} listingData An array of objects containing the listings data
 * @returns {string} Returns one "img" element
 */
export function addMedia(listingData) {
  const mediaArrayLength = listingData.media.length;

  const imgDisplayed = document.createElement("img");
  imgDisplayed.classList.add("object-fit-cover");
  imgDisplayed.id = "main-listing-img";

  if (mediaArrayLength > 0) {
    const mediaUrl = listingData.media[0].url;
    const mediaAlt = listingData.media[0].alt;
    imgDisplayed.src = mediaUrl;

    if (mediaAlt === "") {
      imgDisplayed.alt = "Placeholder image-text for listing image. The user have not added any image-text.";
    }
    if (mediaAlt !== "") {
      imgDisplayed.alt = mediaAlt;
    }
  }

  if (mediaArrayLength === 0) {
    const pathname = window.location.pathname;
    imgDisplayed.src = "src/img/placeholder.jpg";

    if (pathname.includes("profile") || pathname.includes("userListings") || pathname.includes("listing")) {
      imgDisplayed.src = "../src/img/placeholder.jpg";
    }
    imgDisplayed.alt = "Placeholder image. The user have not uploaded any images for this listing.";
  }
  return imgDisplayed;
}

/**
 * The function generates populates the mediaGallery element with the images from the array passed to it.
 * The function adds an evenlistener to the images to display whichever image is clicked on and to open the main image in a modal if clicked on.
 *
 * @param {Object[]} mediaArray An array of objects containing the listings images
 */
export function generateMediaGallery(mediaArray) {
  const mediaGallery = document.getElementById("mediaGallery");
  const focusImgContainer = document.getElementById("focusImg");
  focusImgContainer.setAttribute("data-bs-target", "#imageModal");
  focusImgContainer.setAttribute("data-bs-toggle", "modal");

  const focusImg = document.createElement("img");
  focusImg.classList.add("img-fluid", "pointer");
  focusImgContainer.append(focusImg);

  if (mediaArray.length <= 0) {
    focusImg.src = "../src/img/placeholder.jpg";
    focusImg.alt = "Placeholder image-text for listing image. The user have not added any image-text.";
  }
  if (mediaArray.length >= 1) {
    focusImg.src = mediaArray[0].url;
    focusImg.alt = mediaArray[0].alt;
  }
  if (mediaArray.length >= 2) {
    for (let i = 0; i < mediaArray.length; i++) {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("media");

      const img = document.createElement("img");
      img.classList.add("media-gallery-img", "pointer");
      img.src = mediaArray[i].url;
      img.alt = mediaArray[i].alt;

      imgContainer.append(img);
      mediaGallery.appendChild(imgContainer);

      img.addEventListener("click", (event) => {
        focusImg.src = event.target.src;
        focusImg.alt = event.target.alt;
      });
    }
  }
  focusImg.addEventListener("click", (event) => {
    const modalImg = document.getElementById("modalImg");
    const imgDescription = document.getElementById("imgDescription");

    modalImg.src = event.target.src;
    modalImg.alt = event.target.alt;

    imgDescription.innerText = event.target.alt;
  });
}
