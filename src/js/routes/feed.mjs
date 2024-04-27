import { get } from "../api/listings/get.mjs";

const feed = document.getElementById("feed");

export async function loggedOutFeed() {
  const listings = await get("listingsByPage", 1);
  renderListings(listings, feed);
}

export function loggedInFeed() {}

//ARRAY OF LISTINGS
export function renderListings(listingsArray, container) {
  if (listingsArray.length === 0 || !listingsArray) {
    console.log("no listings found, check renderListings function in the feed.js");
    // loader.style.display = "none";
    // loadMoreBtn.style.display = "none";
    // displayMessage.innerText = "there's no posts matching this search or filter";
  } else {
    // displayMessage.innerText = "";
    for (let i = 0; i < listingsArray.length; i++) {
      container.append(loggedOutListingTemplate(listingsArray[i]));
    }
    // loader.style.display = "none";
  }
}

//ONE LISTING
export function renderListing(listing, container) {
  container.append(loggedOutListingTemplate(listing));
}

//TEMPLATE LOGGED OUT START FEED
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
export function loggedOutListingTemplate(listingData) {
  const listingMedia = listingData.media.length;
  const listingTitle = listingData.title;
  const listingEndsAt = new Date(listingData.endsAt);
  const listingEndsAtDate = listingEndsAt.toLocaleDateString();
  const listingEndsAtTime = listingEndsAt.toLocaleTimeString();
  const listingBids = listingData.bids.length;

  const col = document.createElement("div");
  col.classList.add("col");

  const listing = document.createElement("div");
  listing.classList.add("listing", "glassmorphism");

  const mainImg = document.createElement("img");
  mainImg.classList.add("object-fit-cover", "main-listing-img");

  if (listingMedia > 0) {
    const listingPhoto = listingData.media[0].url;
    const listingDescription = listingData.media[0].alt;
    mainImg.src = listingPhoto;

    if (listingDescription === "") {
      mainImg.alt = "Placeholder image-text for listing image. The user have not added any image-text.";
    }
    if (listingDescription !== "") {
      mainImg.alt = listingDescription;
    }
  }
  if (listingMedia === 0) {
    mainImg.src = "src/img/placeholder.png";
    mainImg.alt = "Placeholder image. The user have not uploaded any images for this listing.";
  }

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("d-flex", "align-items-center", "justify-content-center", "title-container");

  const title = document.createElement("h2"); //double check if this should be h2 or something else
  title.classList.add("listing-title", "heading-2-feed", "uppercase", "extra-bold");
  title.innerText = listingTitle;
  titleContainer.append(title);

  const bidContainer = document.createElement("div");
  bidContainer.classList.add("pill", "d-flex", "justify-content-between", "semi-bold", "bg-orange");

  const currentBid = document.createElement("div");
  currentBid.classList.add("current-bid");

  //https://flexiple.com/javascript/get-last-array-element-javascript
  if (listingBids > 0) {
    const allBids = listingData.bids;
    const lastBid = allBids[allBids.length - 1];
    currentBid.innerText = lastBid.amount + " $";
  }
  if (listingBids === 0) {
    currentBid.innerText = "0 $"; //add a special styling for the ones without bids
  }

  const bidTimer = document.createElement("div");
  bidTimer.classList.add("timer");
  bidTimer.innerText = listingEndsAtTime;

  bidContainer.append(currentBid, bidTimer);
  listing.append(mainImg, titleContainer, bidContainer);
  col.append(listing);

  return col;
}
