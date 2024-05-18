import { addCurrentBid, addDeadline } from "./bids.js";
import { generateBtn } from "./btns.js";
import { addMedia } from "./media.js";

export function listingsTemplate(listingData, userIsLoggedIn) {
  const listingTitle = listingData.title;
  const listingID = listingData.id;
  const bidsArray = listingData.bids;
  const endsAt = listingData.endsAt;

  const col = document.createElement("div");
  col.classList.add("col");

  const listing = document.createElement("div");
  listing.classList.add("listing", "glassmorphism");
  listing.id = listingID;

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("d-flex", "align-items-center", "justify-content-center");
  titleContainer.id = "title-container";
  const title = document.createElement("h2");
  title.classList.add("heading-2-feed", "text-uppercase", "extra-bold");
  title.id = "listing-title";
  title.innerText = listingTitle;
  titleContainer.append(title);

  const img = addMedia(listingData);
  const currentBidContainer = addCurrentBid(bidsArray);
  const countdownContainer = addDeadline(endsAt);

  const bidContainer = document.createElement("div");
  bidContainer.classList.add("d-flex", "flex-column", "justify-content-between", "semi-bold");
  bidContainer.append(currentBidContainer, countdownContainer);

  //LISTINGS DISPLAYED PUBLICLY (NOT LOGGED IN)
  if (!userIsLoggedIn) {
    listing.append(img, titleContainer, bidContainer);
    col.append(listing);
  }

  //LISTINGS DISPLAYED (LOGGED IN)
  if (userIsLoggedIn) {
    const listingFooter = document.createElement("div");
    listingFooter.classList.add("listing-footer", "d-flex", "flex-column", "gap-2");

    const pathname = window.location.pathname;
    let viewLink = `listing/index.html?key=${listingID}`;

    if (pathname.includes("profile") || pathname.includes("allListings")) {
      viewLink = `../listing/index.html?key=${listingID}`;
    }

    const viewListingBtn = generateBtn("viewListingBtn", "view", viewLink);
    listingFooter.append(bidContainer, viewListingBtn);

    if (pathname.includes("profile") || pathname.includes("allListings")) {
      const editLink = `../edit/index.html?key=${listingID}`;
      const editListingBtn = generateBtn("editListingBtn", "edit", editLink);
      listingFooter.append(editListingBtn);
    }

    listing.append(img, titleContainer, listingFooter);
    col.append(listing);
  }
  return col;
}
