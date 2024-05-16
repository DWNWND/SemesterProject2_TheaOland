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
  listing.setAttribute("id", listingID);

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("d-flex", "align-items-center", "justify-content-center", "title-container");
  const title = document.createElement("h2"); //double check if this should be h2 or something else
  title.classList.add("listing-title", "heading-2-feed", "uppercase", "extra-bold");
  title.innerText = listingTitle;
  titleContainer.append(title);

  const img = addMedia(listingData);
  const currentBidContainer = addCurrentBid(bidsArray);
  const countdownContainer = addDeadline(endsAt);

  const imgContainer = document.createElement("div");
  const ImgLoaderContainer = document.createElement("div");
  ImgLoaderContainer.classList.add("d-flex", "flex-column", "align-items-center", "p-3");
  ImgLoaderContainer.innerHTML = `<span id="loader" class="loader"><span class="visually-hidden">Loading listings...</span></span>`;
  ImgLoaderContainer.id = "ImgLoaderContainer";

  imgContainer.append(ImgLoaderContainer, img);

  const bidContainer = document.createElement("div");
  bidContainer.classList.add("pill", "d-flex", "flex-column", "justify-content-between", "semi-bold");
  bidContainer.append(currentBidContainer, countdownContainer);

  //LISTINGS DISPLAYED PUBLICLY (NOT LOGGED IN)
  if (!userIsLoggedIn) {
    listing.append(imgContainer, titleContainer, bidContainer);
    col.append(listing);
  }

  //LISTINGS DISPLAYED (LOGGED IN)
  if (userIsLoggedIn) {
    const listingFooter = document.createElement("div");
    listingFooter.classList.add("listing-footer", "d-flex", "flex-column", "gap-2");

    const link = `/listing/index.html?key=${listingID}`;
    const viewListingBtn = generateBtn("viewListingBtn", "view", link);

    listingFooter.append(bidContainer, viewListingBtn);
    listing.append(imgContainer, titleContainer, listingFooter);
    col.append(listing);

    const pathname = window.location.pathname;

    if (pathname.includes("profile") || pathname.includes("allListings")) {
      const link = `./edit/index.html?key=${listingID}`;
      const editListingBtn = generateBtn("editListingBtn", "edit", link);

      listingFooter.append(editListingBtn);
    }
  }
  return col;
}
