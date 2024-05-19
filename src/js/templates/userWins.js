import { get } from "../api/requests/get.js";

/**
 * The function appends the users wins to the wins container in the DOM.
 *
 * @param {string} username The logged in users username
 * @uses get To fetch the users wins
 */
export async function displayWins(username) {
  const wins = await get("winsByProfile", username);
  const winsContainer = document.getElementById("wins");

  if (wins.length === 0) {
    const userFeedbackMsg = "no wins yet";
    winsContainer.append(userFeedbackMsg);
  } else {
    wins.forEach((win) => {
      const bidsArray = win.bids;
      const bidArraylength = win.bids.length;

      const titleContainer = document.createElement("div");
      titleContainer.classList.add("text-uppercase", "heading-2-feed");
      const winAmountContainer = document.createElement("div");
      winAmountContainer.classList.add("text-dark-orange");
      titleContainer.innerHTML = win.title;

      const winContainer = document.createElement("a");
      winContainer.classList.add("d-flex", "bg-light-orange", "w-100", "rounded", "p-2", "justify-content-between", "align-items-center", "text-decoration-none", "pointer");

      const link = `../listing/index.html?key=${win.id}`;
      winContainer.href = link;

      if (bidArraylength > 0) {
        const lastBid = bidsArray[bidArraylength - 1];
        const winningBid = lastBid.amount;
        winAmountContainer.innerText = winningBid + " credit";
      }

      winContainer.append(titleContainer, winAmountContainer);
      winsContainer.append(winContainer);
    });
  }
}
