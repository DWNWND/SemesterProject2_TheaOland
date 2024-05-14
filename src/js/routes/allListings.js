import { get } from "../api/requests/get.js";
import { load } from "../storage/_index.js";
import { navTemplate } from "../templates/_index.js";
import { renderListings, updateTotalPageDisplay, updatePaginationBtns, updateCurrentPageDisplay } from "../handlers/events/_index.js";
import { listenForPageTurn } from "../handlers/listners/_index.js";
import { userFeedback } from "../ui/userFeedback/_index.js";

const feed = document.getElementById("feed");
const feedbackContainer = document.getElementById("feedbackContainer");
// const navPages = document.getElementById("navPages");
const nxtBtn = document.getElementById("nxtBtn");
const prvBtn = document.getElementById("prvBtn");
const pagination = document.getElementById("paginationElement");

let page = 1;
const profile = load("profile");

export async function userListings() {
  try {
    // navPages.style.display = "none";
    pagination.style.display = "none";

    const listingsArrray = await get("listingsByProfile", page, profile.name);
    renderListings(listingsArrray, feed);

    updateTotalPageDisplay();
    updateCurrentPageDisplay(page);
    updatePaginationBtns(nxtBtn, prvBtn, page);
  } catch (error) {
    console.log(error);
    userFeedback(error, feedbackContainer);
  }
}

export async function generateUserFeed() {
  navTemplate(profile.name);
  await userListings();
  listenForPageTurn(nxtBtn, prvBtn);
}
