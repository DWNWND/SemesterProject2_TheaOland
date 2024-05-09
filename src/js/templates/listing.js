import { coundownTimer } from "../events/listners/countdownTimer.js";
import { publishNewBid } from "../api/requests/post.js";

export function listingSpecificTemplate(listingData) {
  const title = document.getElementById("auction-item-name");
  title.innerText = listingData.title;

  generateMediaGallery(listingData.media);
  displayBids(listingData.bids, listingData);
  listenForNewBid(listingData);

  const description = document.getElementById("description");
  description.innerText = listingData.description;
}

function parse(newBid) {
  let parsedBid = { ...newBid };
  if ("amount" in newBid) {
    parsedBid.amount = parseInt(newBid.amount);
  }
  return parsedBid;
}

function listenForNewBid(listingData) {
  document.forms.placeBid.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newBid = Object.fromEntries(formData.entries());
    const parsedBid = parse(newBid);

    publishNewBid(listingData.id, parsedBid);
  });
}

function displayBids(bidsArray, listingData) {
  const bidHistory = document.getElementById("bidHistory");
  if (bidsArray.length <= 0) {
    bidHistory.innerText = "no bids yet";
    bidHistory.classList.add("text-center", "text-grayish-purple", "fst-italic");
  }
  if (bidsArray.length >= 1) {
    const allBids = bidsArray;
    const lastBid = allBids[allBids.length - 1];

    const currentBid = document.getElementById("currentBid");
    currentBid.innerText = lastBid.amount;

    for (let i = 0; i < bidsArray.length; i++) {
      const bidContainer = document.createElement("div");
      bidContainer.classList.add("bid-container", "d-flex", "justify-content-between", "align-items-center");

      const sum = document.createElement("div");
      sum.classList.add("sum");
      sum.innerText = "$ " + bidsArray[i].amount;

      const username = document.createElement("div");
      username.classList.add("username");
      username.innerText = bidsArray[i].bidder.name;

      const timePlaced = document.createElement("div");
      timePlaced.classList.add("d-flex", "flex-column", "align-items-center", "p-1");
      const time = document.createElement("div");
      time.classList.add("mediumText");
      const date = document.createElement("div");
      date.classList.add("smallText");
      const timeDate = new Date(bidsArray[i].created);
      const timeBidPlaced = timeDate.toLocaleTimeString();
      const dateBidPlaced = timeDate.toLocaleDateString();
      time.append(timeBidPlaced);
      date.append(dateBidPlaced);
      timePlaced.append(time, date);

      bidContainer.append(sum, username, timePlaced);
      bidHistory.appendChild(bidContainer);
    }
  }
  const timer = document.getElementById("timer");
  const listingEndsAt = new Date(listingData.endsAt);
  coundownTimer(listingEndsAt, timer);
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
