import { get } from "../api/requests/get.js";
import { load } from "../storage/_index.js";
import * as generate from "../templates/_index.js";
import { renderListings, updateTotalPageDisplay, updateCurrentPageDisplay, updatePaginationBtns } from "../handlers/events/_index.js";
import { listenForPageTurn, listenForSearch } from "../handlers/listners/_index.js";
import { userFeedback } from "../ui/userFeedback/_index.js";

const feed = document.getElementById("feed");
const feedbackContainer = document.getElementById("feedbackContainer");
// const navPages = document.getElementById("navPages");
const nxtBtn = document.getElementById("nxtBtn");
const prvBtn = document.getElementById("prvBtn");

let page = 1;
const token = load("token");
const profile = load("profile");

export async function startFeed() {
  try {
    const listingsByPage = await get("listingsByPage", page);
    renderListings(listingsByPage, feed);
    updateTotalPageDisplay();
    updateCurrentPageDisplay(page);
    updatePaginationBtns(nxtBtn, prvBtn, page);
  } catch (error) {
    // navPages.style.display = "none";
    console.log(error);
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
  await listenForSearch(page);
  listenForPageTurn(nxtBtn, prvBtn);
}
