import { load } from "../storage/index.js";
import { get } from "../api/requests/get.js";
import { renderListings } from "./feed.js";
import { updateTotalPageDisplay, updatePaginationBtns, updateCurrentPageDisplay } from "../events/listners/pagination.js";
import { userFeedback } from "../ui/components/errors/userFeedback.js";
import { navTemplate } from "../templates/nav.js";
import { listenForSearch, listenForPageTurn } from "../events/listners/navPages.js";

const feed = document.getElementById("feed");
const feedbackContainer = document.getElementById("feedbackContainer");
const navPages = document.getElementById("navPages");
const nxtBtn = document.getElementById("nxtBtn");
const prvBtn = document.getElementById("prvBtn");
const uxElement = document.getElementById("uxElement");
const searchElement = document.getElementById("searchElement");
const pagination = document.getElementById("paginationElement");

let page = 1;
const token = load("token");
const profile = load("profile");

export async function userListings() {
  try {
    navPages.style.display = "none";
    pagination.style.display = "none";

    const listingsByPage = await get("listingsByProfile", page, profile.name);
    renderListings(listingsByPage, feed, token);
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
