import { get, currentPage } from "../api/requests/get.js";
import { navigatePages } from "../events/listners/navPages.js";
import { load } from "../storage/load.js";
import * as generate from "../templates/index.js";
import { userFeedback } from "../ui/components/errors/userFeedback.js";
import { search } from "../events/listners/onSearch.js";
import { checkNavPagesBtns, updatePagination } from "../events/listners/pagination.js";

const feed = document.getElementById("feed");
const feedbackContainer = document.getElementById("feedbackContainer");
const navPages = document.getElementById("navPages");
const nxtBtn = document.getElementById("nxtBtn");
const prvBtn = document.getElementById("prvBtn");
// const loader = document.getElementById("loader");
const uxElement = document.getElementById("uxElement");
const searchElement = document.getElementById("searchElement");

let page = 1;
const token = load("token");
const profile = load("profile");

export async function startFeed() {
  try {
    const listingsByPage = await get("listingsByPage", page);
    renderListings(listingsByPage, feed);
    updatePagination(currentPage);
    checkNavPagesBtns(currentPage);
  } catch (error) {
    userFeedback(error, feedbackContainer);
  }
}

export async function generateFeed() {
  if (token) {
    console.log("logged in");
    const username = profile.name;
    generate.navTemplate(username);
  }
  if (!token) {
    console.log("not logged in");
    generate.navTemplate();
  }
  await startFeed();
  await search();
  navigatePages(nxtBtn, prvBtn);
}

//ARRAY OF LISTINGS (USING LISTING TEMPLATE)
export function renderListings(listingsArray, container) {
  try {
    if (listingsArray.length === 0 || !listingsArray) {
      navPages.style.display = "none";
      // checkNavPagesBtns(currentPage);
      throw new Error("there's no more listings in this search.");
    } else {
      container.innerHTML = "";
      for (let i = 0; i < listingsArray.length; i++) {
        container.append(generate.listingTemplate(listingsArray[i], token));
      }
      // checkNavPagesBtns(currentPage);
      uxElement.innerHTML = "";
      searchElement.style.display = "block";
      navPages.style.display = "block";
    }
  } catch (error) {
    userFeedback(error, feedbackContainer);
  }
}

//ONE LISTING - NOT IN USE YET
// export function renderSingleListing(listing, container) {
//   container.append(listingSomething(listing));
// }
