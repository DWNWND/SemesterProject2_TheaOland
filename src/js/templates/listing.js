import { generateMediaGallery, addCurrentBid, addDeadline, displayBidHistory, addPlaceBidForm } from "./_index.js";
import { listenForNewBid } from "../handlers/listners/_index.js";

/**
 * The function populates the listing spesific page with the listing passed to it.
 *
 * @param {Object} listingData The listingdata object
 * @param {string} listingData.title Listing title
 * @param {Object[]} listingData.media Listing media
 * @param {Object[]} listingData.bids Listing bids array
 * @param {string} listingData.id Listing id
 * @param {string} listingData.description Listing description
 * @param {Object[]} listingData.tags Listing tags
 * @param {Date} listingData.created Listing date/time creted
 * @param {Date} listingData.updated Listing date/time updated
 * @param {Date} listingData.endsAt Listing deadline
 * @param {string} listingData.seller Listing seller
 *
 * @uses generateMediaGallery To display the listings media gallery¨
 * @uses addCurrentBid To display the listings current bid
 * @uses displayBidHistory To display the listings bid history
 * @uses addPlaceBidForm To generate a form to place new bid
 * @uses listenForNewBid To listen for a new bid
 * @uses addDeadline To display the listings deadline countdown
 */

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
