import { addCurrentBid, addDeadline, generateBtn, addMedia } from "./_index.js";

/**
 * The function generates a "div" element with the class "col" for each listing passed to it.
 * The "col" class makes it fit into a boostrap grid-layout.
 
 * The function displays the listings differently if a user is logged in user or not.
 * 
 * @param {object} listingData An array of objects containing the listings data
 * @param {string} userIsLoggedIn Is present if a user is logged in, not present if no ones logged in
 * 
 * @returns {string} Returns a "div" elemement for each listing´
 * 
 * @uses addMedia To display the listings main image
 * @uses addCurrentBid To display the listings current bid
 * @uses addDeadline To display the listings deadline countdown
 * @uses generateBtn To generate a button element
 */

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

  if (!userIsLoggedIn) {
    listing.append(img, titleContainer, bidContainer);
    col.append(listing);
  }

  if (userIsLoggedIn) {
    const listingFooter = document.createElement("div");
    listingFooter.classList.add("listing-footer", "d-flex", "flex-column", "gap-2");

    const pathname = window.location.pathname;
    let viewLink = `listing/index.html?key=${listingID}`;

    if (pathname.includes("profile") || pathname.includes("userListings")) {
      viewLink = `../listing/index.html?key=${listingID}`;
    }

    const viewListingBtn = generateBtn("viewListingBtn", "view", viewLink);
    listingFooter.append(bidContainer, viewListingBtn);

    if (pathname.includes("profile") || pathname.includes("userListings")) {
      const editLink = `../postListing/index.html?key=${listingID}`;
      const editListingBtn = generateBtn("editListingBtn", "edit", editLink);
      listingFooter.append(editListingBtn);
    }

    listing.append(img, titleContainer, listingFooter);
    col.append(listing);
  }
  return col;
}
