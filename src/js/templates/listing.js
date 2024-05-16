import { generateMediaGallery } from "./media.js";
import { addCurrentBid, addDeadline, displayBidHistory, addPlaceBidForm } from "./bids.js";
import { listenForNewBid } from "../handlers/listners/_index.js";

export function listingSpecificTemplate({ title, media, bids, id, description, tags, created, updated, endsAt, seller }) {
  const titleContainer = document.getElementById("auction-item-name");
  titleContainer.innerText = title;

  generateMediaGallery(media);
  displayBidHistory(bids);
  listenForNewBid(id);
  addPlaceBidForm(endsAt);

  const countdownContainer = addDeadline(endsAt);
  const currentBidContainer = addCurrentBid(bids);
  const bidContainer = document.getElementById("currentBidContainer");
  bidContainer.append(currentBidContainer, countdownContainer);

  const descriptionContainer = document.getElementById("description");
  descriptionContainer.innerText = description;

  const tagsContainer = document.getElementById("tags");
  if (tags.length == 0) {
    tagsContainer.innerText = "no tags";
  } else {
    tags.forEach((tag) => {
      const tagHtml = " #" + tag;
      tagsContainer.append(tagHtml);
    });
  }
  const sellerContainer = document.getElementById("seller");
  sellerContainer.innerText = seller.name;

  const createdDate = new Date(created);
  const createdDateFormatted = createdDate.toLocaleString();

  const createdContainer = document.getElementById("created");
  createdContainer.innerText = createdDateFormatted;

  const updatedDate = new Date(updated);
  const updatedDateFormatted = updatedDate.toLocaleString();

  const updatedContainer = document.getElementById("updated");
  updatedContainer.innerText = updatedDateFormatted;
}
