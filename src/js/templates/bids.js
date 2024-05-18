import { countdownTimer } from "../ux/components/countdownTimer.js";

export function addCurrentBid(bidsArray) {
  const bidArraylength = bidsArray.length;

  const currentBidContainer = document.createElement("div");
  currentBidContainer.classList.add("current-bid", "bg-light-purple");

  if (bidArraylength > 0) {
    const lastBid = bidsArray[bidArraylength - 1];
    const currentBid = lastBid.amount;
    currentBidContainer.innerText = currentBid + " credit";

    const bidInput = document.getElementById("bid-input");
    if (bidInput) {
      const currentBidPlusOne = currentBid + 1;
      bidInput.value = currentBidPlusOne;
    }
  }
  if (bidArraylength === 0) {
    currentBidContainer.innerText = "no bids yet";
    currentBidContainer.classList.add("text-dark-gray", "fst-italic", "bg-light-purple-disabled");
  }
  return currentBidContainer;
}

export function addPlaceBidForm(endsAt) {
  const deadline = new Date(endsAt);
  const now = new Date().getTime();
  const countDownTime = deadline.getTime();
  const distance = countDownTime - now;

  const placeBidForm = document.getElementById("placeBid");

  if (distance > 0) {
    const currentBidHeading = document.getElementById("currentBidHeading");
    currentBidHeading.innerText = "current bid:";
    currentBidHeading.classList.add("text-red", "mt-2", "mb-3");
    placeBidForm.innerHTML = `
        <input name="amount" type="number" class="bid form-control" id="bid-input" required />
        <label for="bid-input" class="text-grayish-purple hide">place your bid</label>
        <button type="submit" for="bid-input" class="btn-local btn-height-m w-100 btn-white-red btn-fontsize-m lowercase align-self-center">Submit bid</button>`;
  }

  if (distance < 0) {
    const currentBidHeading = document.getElementById("currentBidHeading");
    currentBidHeading.innerText = "winning bid:";
  }
}

export function addDeadline(endsAt) {
  const deadline = new Date(endsAt);
  const timerContainer = document.createElement("div");
  timerContainer.classList.add("timer");
  countdownTimer(deadline, timerContainer);
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
