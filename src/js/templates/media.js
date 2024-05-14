export function addMedia(listingData) {
  const mediaArrayLength = listingData.media.length;

  const imgDisplayed = document.createElement("img");
  imgDisplayed.classList.add("object-fit-cover", "main-listing-img");

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
    imgDisplayed.src = "src/img/placeholder.jpg";
    imgDisplayed.alt = "Placeholder image. The user have not uploaded any images for this listing.";
  }
  return imgDisplayed;
}

export function generateMediaGallery(mediaArray) {
  const mediaGallery = document.getElementById("mediaGallery");
  const focusImgContainer = document.getElementById("focusImg");
  focusImgContainer.setAttribute("data-bs-target", "#imageModal");
  focusImgContainer.setAttribute("data-bs-toggle", "modal");

  const focusImg = document.createElement("img");
  focusImg.classList.add("img-fluid");
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
