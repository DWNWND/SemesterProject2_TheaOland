import { coundownTimer } from "../events/listners/countdownTimer.js";
import { publishNewBid } from "../api/requests/post.js";

export function listingSpecificTemplate({ title, media, bids, id, description, endsAt }) {
  const titleContainer = document.getElementById("auction-item-name");
  titleContainer.innerText = title;

  generateMediaGallery(media);
  displayBids(bids, endsAt);
  listenForNewBid(id);

  const descriptionContainer = document.getElementById("description");
  descriptionContainer.innerText = description;
}

function listenForNewBid(listingID) {
  document.forms.placeBid.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newBid = Object.fromEntries(formData.entries());

    let parsedBid = { ...newBid };
    parsedBid.amount = parseInt(newBid.amount);

    publishNewBid(listingID, parsedBid);
  });
}

function displayBids(bidsArray, endsAt) {
  const bidArraylength = bidsArray.length;
  const bidHistoryContainer = document.getElementById("bidHistory");

  if (bidArraylength <= 0) {
    bidHistoryContainer.innerText = "no bids yet";
    bidHistoryContainer.classList.add("text-center", "text-grayish-purple", "fst-italic");
  }

  if (bidArraylength >= 1) {
    const lastBid = bidsArray[bidArraylength - 1];
    const currentBid = lastBid.amount;

    const currentBidContainer = document.getElementById("currentBid");
    currentBidContainer.innerText = currentBid;

    for (let i = 0; i < bidArraylength; i++) {
      const bidAmount = bidsArray[i].amount;
      const bidAmountContainer = document.createElement("div");
      bidAmountContainer.classList.add("bid");
      bidAmountContainer.innerText = bidAmount + " credit";

      const bidderUsername = bidsArray[i].bidder.name;
      const bidderNameContainer = document.createElement("div");
      bidderNameContainer.classList.add("username");
      bidderNameContainer.innerText = bidderUsername;

      const bidCreated = bidsArray[i].created;
      const timeDate = new Date(bidCreated);

      const timeContainer = document.createElement("div");
      timeContainer.classList.add("mediumText");
      const timeBidCreated = timeDate.toLocaleTimeString();
      timeContainer.append(timeBidCreated);

      const dateContainer = document.createElement("div");
      dateContainer.classList.add("smallText");
      const dateBidCreated = timeDate.toLocaleDateString();
      dateContainer.append(dateBidCreated);

      const bidCreatedContainer = document.createElement("div");
      bidCreatedContainer.classList.add("d-flex", "flex-column", "align-items-center", "p-1");
      bidCreatedContainer.append(timeContainer, dateContainer);

      const singleBidContainer = document.createElement("div");
      singleBidContainer.classList.add("bid-container", "d-flex", "justify-content-between", "align-items-center");
      singleBidContainer.append(bidAmountContainer, bidderNameContainer, bidCreatedContainer);

      bidHistoryContainer.appendChild(singleBidContainer);
    }
  }
  const countdownContainer = document.getElementById("timer");
  const deadline = new Date(endsAt);
  coundownTimer(deadline, countdownContainer);
}

function generateMediaGallery(mediaArray) {
  const mediaGallery = document.getElementById("mediaGallery");

  const focusImgContainer = document.getElementById("focusImg");
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
      img.classList.add("media-gallery-img");
      img.src = mediaArray[i].url;
      img.alt = mediaArray[i].alt;

      imgContainer.append(img);
      mediaGallery.appendChild(imgContainer);

      img.addEventListener("click", (event) => {
        const selectedImg = event.target;
        const url = selectedImg.src;
        const alt = selectedImg.alt;

        focusImg.src = url;
        focusImg.alt = alt;

        if (img.src === focusImg.src) {
          img.classList.add("inFocus");
        } else {
          img.classList.remove("inFocus");
        }
      });
    }
  }
}
