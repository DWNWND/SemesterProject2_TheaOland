import { generateMediaGallery } from "./media.js";
import { addCurrentBid, addDeadline, displayBidHistory } from "./bids.js";
import { listenForNewBid } from "../handlers/listners/_index.js";

export function listingSpecificTemplate({ title, media, bids, id, description, endsAt }) {
  const titleContainer = document.getElementById("auction-item-name");
  titleContainer.innerText = title;

  generateMediaGallery(media);
  displayBidHistory(bids);
  listenForNewBid(id);

  const countdownContainer = addDeadline(endsAt);
  const currentBidContainer = addCurrentBid(bids);
  const bidContainer = document.getElementById("currentBidContainer");
  bidContainer.append(currentBidContainer, countdownContainer);

  const descriptionContainer = document.getElementById("description");
  descriptionContainer.innerText = description;
}
