import { get } from "../api/requests/get.js";

/**
 * The function appends the users bids to the bids container in the DOM.
 *
 * @param {string} username The logged in users username
 *
 * @uses get To fetch the users bids
 */
export async function displayBids(username) {
  const bids = await get("bidsByProfile", username);
  const bidsContainer = document.getElementById("bids");

  if (bids.length === 0) {
    const userFeedbackMsg = "no bids yet";
    bidsContainer.append(userFeedbackMsg);
  } else {
    bids.forEach((bid) => {
      const bidContainer = document.createElement("a");
      const link = `../listing/index.html?key=${bid.listing.id}`;
      bidContainer.href = link;

      bidContainer.classList.add("d-flex", "bg-light-pink", "w-100", "rounded", "p-2", "justify-content-between", "align-items-center", "text-decoration-none", "pointer");
      const titleContainer = document.createElement("div");
      titleContainer.classList.add("text-uppercase", "heading-2-feed");
      const bidAmountContainer = document.createElement("div");
      bidAmountContainer.classList.add("text-dark-red");

      titleContainer.innerText = bid.listing.title;
      bidAmountContainer.innerText = bid.amount + " credit";

      bidContainer.append(titleContainer, bidAmountContainer);
      bidsContainer.append(bidContainer);
    });
  }
}
