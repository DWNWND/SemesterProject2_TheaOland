import { get } from "../api/requests/get.mjs";
import { loadMoreListings } from "../events/listners/loadMore.mjs";
import { load } from "../storage/load.mjs";

const feed = document.getElementById("feed");
const loadMoreBtn = document.getElementById("loadMore");
const loader = document.getElementById("loader");
const userFeedback = document.getElementById("userFeedback");
const uxElement = document.getElementById("uxElement");
const searchElement = document.getElementById("searchElement");
const paginationElement = document.getElementById("paginationElement");
const pathname = window.location.pathname;
let page = 1;

function generateNav(username) {
  //LOGIN BTN
  const loginLink = document.createElement("a");
  loginLink.setAttribute("href", "./auth/index.html");
  const loginBtn = document.createElement("button");
  loginBtn.classList.add("btn-local", "btn-height-l", "btn-width-m", "btn-white-red", "btn-fontsize-l", "uppercase");
  loginBtn.setAttribute("id", "loginBtnLanding");
  loginBtn.innerText = "Login";
  loginLink.append(loginBtn);

  //USERNAME BTN
  const usernameLink = document.createElement("a");
  usernameLink.setAttribute("href", "./profile/index.html");
  const usernameBtn = document.createElement("button");
  usernameBtn.classList.add("btn-local", "btn-height-l", "btn-width-l", "btn-pink", "btn-fontsize-l", "extra-bold", "uppercase");
  usernameBtn.setAttribute("id", "usernameBtn");
  usernameBtn.innerText = "username"; //EDIT THIS LATER
  usernameLink.append(usernameBtn);

  //NEW LISTING BTN
  const newlistingLink = document.createElement("a");
  newlistingLink.setAttribute("href", "./edit/index.html");
  const newlistingBtn = document.createElement("button");
  newlistingBtn.classList.add("btn-local", "btn-height-l", "btn-width-l", "btn-orange", "btn-fontsize-l", "extra-bold", "uppercase");
  newlistingBtn.setAttribute("id", "newlistingBtn");
  newlistingBtn.innerText = "Add new listing";
  newlistingLink.append(newlistingBtn);

  //LOGOUT BTN
  const logoutLink = document.createElement("a");
  logoutLink.setAttribute("href", "/");
  const logoutBtn = document.createElement("button");
  logoutBtn.classList.add("btn-local", "btn-height-s", "btn-width-xs", "btn-white-black", "btn-fontsize-l", "lowercase");
  logoutBtn.setAttribute("id", "logoutBtn");
  logoutBtn.innerText = "log out";
  logoutLink.append(logoutBtn);

  const token = load("token");
  const nav = document.getElementById("nav");

  if (!token) {
    nav.append(loginLink);
  }
  if ((token && pathname === "/") || (token && pathname.includes("listing"))) {
    nav.append(newlistingLink, usernameLink, logoutLink);
  }
  if (token && pathname.includes("profile")) {
    nav.append(newlistingLink, logoutLink);
  }
  if (token && pathname.includes("edit")) {
    nav.append(usernameLink, logoutLink);
  }
}

export async function generateFeed() {
  const listings = await get("listingsByPage", page);
  generateNav();
  renderListings(listings, feed);
  loadMoreListings(loadMoreBtn);
}

//ARRAY OF LISTINGS (USING LISTING TEMPLATE)
export function renderListings(listingsArray, container) {
  if (listingsArray.length === 0 || !listingsArray) {
    console.log("no listings found, check renderListings function in the feed.js");
    loader.style.display = "none";
    userFeedback.innerText = "there's no listings matching this search.";
  } else {
    const token = load("token");
    for (let i = 0; i < listingsArray.length; i++) {
      container.append(listingTemplate(listingsArray[i], token));
    }
    uxElement.innerHTML = "";
    searchElement.style.display = "block";
    paginationElement.style.display = "block";
    loadMoreBtn.style.display = "block";
  }
}

//ONE LISTING - NOT IN USE YET
export function renderSingleListing(listing, container) {
  container.append(listingSomething(listing));
}

// ALL LISTINGS TEMPLATE
export function listingTemplate(listingData, userIsLoggedIn) {
  const listingMedia = listingData.media.length;
  const listingTitle = listingData.title;
  const listingBids = listingData.bids.length;
  //Inspired by: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const listingEndsAt = new Date(listingData.endsAt);
  const listingEndsAtDate = listingEndsAt.toLocaleDateString(); //NOTE: consider adding this or adjust design
  const listingEndsAtTime = listingEndsAt.toLocaleTimeString();

  const col = document.createElement("div");
  col.classList.add("col");

  const listing = document.createElement("div");
  listing.classList.add("listing", "glassmorphism");
  listing.setAttribute("id", "listing");

  const mainImg = document.createElement("img");
  mainImg.classList.add("object-fit-cover", "main-listing-img");

  //check to see if theres images and alt-text connected to the listing, and if not use placeholders
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

  //check to see if theres bids on the listing, and if there is, display the last bid
  if (listingBids > 0) {
    const allBids = listingData.bids;
    //Inspired by: https://flexiple.com/javascript/get-last-array-element-javascript
    const lastBid = allBids[allBids.length - 1];
    currentBid.innerText = lastBid.amount + " $";
  }
  if (listingBids === 0) {
    currentBid.innerText = "0 $"; //NOTE: add a special styling for the ones without bids??
  }

  const bidTimer = document.createElement("div");
  bidTimer.classList.add("timer");
  bidTimer.innerText = listingEndsAtTime;

  //LISTINGS DISPLAYED PUBLICLY (NOT LOGGED IN)
  if (!userIsLoggedIn) {
    console.log("theres no one loggedin");
    bidContainer.append(currentBid, bidTimer);
    listing.append(mainImg, titleContainer, bidContainer);
    col.append(listing);
  }

  //LISTINGS DISPLAYED (LOGGED IN)
  if (userIsLoggedIn) {
    const listingFooter = document.createElement("div");
    listingFooter.classList.add("listing-footer", "d-flex", "flex-column", "gap-2");

    const viewListingBtn = document.createElement("button");
    viewListingBtn.classList.add("btn-local", "btn-height-s", "btn-width-100", "btn-white-black", "btn-fontsize-m", "uppercase");
    viewListingBtn.setAttribute("href", "#");
    viewListingBtn.setAttribute("id", "viewListingBtn");
    viewListingBtn.innerText = "View";

    bidContainer.append(currentBid, bidTimer);
    listingFooter.append(bidContainer, viewListingBtn);
    listing.append(mainImg, titleContainer, listingFooter);
    col.append(listing);

    //LISTINGS BY USER SPESIFIC
    if (pathname.includes("user")) {
      const editListingBtn = document.createElement("button");
      editListingBtn.classList.add("btn-local", "btn-height-s", "btn-width-100", "btn-white-black", "btn-fontsize-m", "uppercase");
      editListingBtn.setAttribute("href", "#");
      editListingBtn.innerText = "Edit";

      listingFooter.append(editListingBtn);
    }
  }
  return col;
}
