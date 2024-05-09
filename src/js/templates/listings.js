import { coundownTimer } from "../events/listners/countdownTimer.js";
import { generateBtn } from "./btns.js";

export function listingTemplate(listingData, userIsLoggedIn) {
  const listingTitle = listingData.title;
  const listingID = listingData.id;

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
  const currentBid = addCurrentBid(listingData);

  //LISTINGS DISPLAYED PUBLICLY (NOT LOGGED IN)
  if (!userIsLoggedIn) {
    listing.append(img, titleContainer, currentBid);
    col.append(listing);
  }

  //LISTINGS DISPLAYED (LOGGED IN)
  if (userIsLoggedIn) {
    const listingFooter = document.createElement("div");
    listingFooter.classList.add("listing-footer", "d-flex", "flex-column", "gap-2");

    const link = `/listing/index.html?key=${listingID}`;
    const viewListingBtn = generateBtn("viewListingBtn", link, "view");

    listingFooter.append(currentBid, viewListingBtn);
    listing.append(img, titleContainer, listingFooter);
    col.append(listing);

    const pathname = window.location.pathname;

    if (pathname.includes("profile") || pathname.includes("allListings")) {
      const link = `/edit/index.html?key=${listingID}`;
      const editListingBtn = generateBtn("editListingBtn", link, "edit");

      listingFooter.append(editListingBtn);
    }
  }
  return col;
}

function addMedia(listingData) {
  const mediaArrayLength = listingData.media.length;

  const imgDisplayed = document.createElement("img");
  imgDisplayed.classList.add("object-fit-cover", "main-listing-img");

  if (mediaArrayLength > 0) {
    const mediaUrl = listingData.media[0].url;
    const mediaAlt = listingData.media[0].alt;
    imgDisplayed.src = mediaUrl;

    if (mediaAlt === "") {
      imgDisplayed.alt = "Placeholder image-text for listing image. The user have not added any image-text.";
    }
    if (mediaAlt !== "") {
      imgDisplayed.alt = mediaAlt;
    }
  }

  if (mediaArrayLength === 0) {
    imgDisplayed.src = "src/img/placeholder.jpg";
    imgDisplayed.alt = "Placeholder image. The user have not uploaded any images for this listing.";
  }
  return imgDisplayed;
}

function addCurrentBid(listingData) {
  const bidArrayLength = listingData.bids.length;
  const deadline = new Date(listingData.endsAt);

  const bidContainer = document.createElement("div");
  bidContainer.classList.add("pill", "d-flex", "flex-column", "justify-content-between", "semi-bold");

  const currentBidContainer = document.createElement("div");
  currentBidContainer.classList.add("current-bid");

  if (bidArrayLength > 0) {
    const allBids = listingData.bids;
    const lastBid = allBids[allBids.length - 1];
    const currentBid = lastBid.amount;
    currentBidContainer.innerText = currentBid + " credit";
  }
  if (bidArrayLength === 0) {
    currentBidContainer.innerText = "no bids yet";
    currentBidContainer.classList.add("text-dark-purple", "fst-italic");
  }

  const timerContainer = document.createElement("div");
  timerContainer.classList.add("timer");

  coundownTimer(deadline, timerContainer);

  bidContainer.append(currentBidContainer, timerContainer);

  return bidContainer;
}
