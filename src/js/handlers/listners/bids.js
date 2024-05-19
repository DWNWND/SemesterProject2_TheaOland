import { publishNewBid } from "../../api/requests/post.js";

/**
 * The function listens for a new bid to be submitted. It takes the data from the new bid form and sends it to the server.
 *
 * @param {string} listingID The id of the listing being deleted
 * @uses publishNewBid To send the new bid to the server
 */
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
