import { coundownTimer } from "../events/listners/countdownTimer.js";
import { publishNewBid } from "../api/requests/post.js";

export function listenForNewBid(listingID) {
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

export function addCurrentBid(bidsArray) {
  const bidArraylength = bidsArray.length;

  const currentBidContainer = document.createElement("div");
  currentBidContainer.classList.add("current-bid");

  if (bidArraylength > 0) {
    const lastBid = bidsArray[bidArraylength - 1];
    const currentBid = lastBid.amount;
    currentBidContainer.innerText = currentBid + " credit";
  }
  if (bidArraylength === 0) {
    currentBidContainer.innerText = "no bids yet";
    currentBidContainer.classList.add("text-dark-purple", "fst-italic");
  }
  return currentBidContainer;
}

export function addDeadline(endsAt) {
  const deadline = new Date(endsAt);
  const timerContainer = document.createElement("div");
  timerContainer.classList.add("timer");
  coundownTimer(deadline, timerContainer);
  return timerContainer;
}

export function displayBidHistory(bidsArray) {
  const bidArraylength = bidsArray.length;
  const bidHistoryContainer = document.getElementById("bidHistory");

  if (bidArraylength <= 0) {
    bidHistoryContainer.innerText = "";
    bidHistoryContainer.classList.add("text-center", "text-grayish-purple", "fst-italic");
  }

  if (bidArraylength >= 1) {
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
}