import { publishNewBid } from "../../api/requests/post.js";

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
