import { get } from "../../api/requests/get.js";
import { startFeed } from "../../routes/feed.js";
import { renderListings, updateTotalPageDisplay, updatePaginationBtns } from "./_index.js";
import { userFeedback } from "../../ui/userFeedback/_index.js";

let query;
let numberOfListings;
const feedbackContainer = document.getElementById("feedbackContainer");
const nxtBtn = document.getElementById("nxtBtn");
const prvBtn = document.getElementById("prvBtn");
const navPages = document.getElementById("navPages");
const searchInput = document.getElementById("searchbar");
const paginationElement = document.getElementById("paginationElement");
const feed = document.getElementById("feed");

export async function search(page) {
  query = searchInput.value;
  const mainHeading = document.getElementById("mainHeading");
  try {
    if (query) {
      mainHeading.innerText = "Listings by search";
      const listingsBySearch = await get("listingsBySearch", page, query);
      numberOfListings = listingsBySearch.length;
      updateTotalPageDisplay();
      updatePaginationBtns(nxtBtn, prvBtn, page);

      if (numberOfListings >= 1) {
        renderListings(listingsBySearch, feed);
        paginationElement.style.display = "block";
        navPages.style.display = "flex";
      }
      if (numberOfListings <= 0) {
        paginationElement.style.display = "none";
        navPages.style.display = "none";
        feed.innerHTML = "";
        throw new Error("No listings match this search.");
      }
    } else if (!query || query === "") {
      mainHeading.innerText = "All listings";
      startFeed();
    }
  } catch (error) {
    console.log(error);
    userFeedback(error, feedbackContainer);
  } finally {
    if (numberOfListings > 0) {
      userFeedback("", feedbackContainer);
    }
  }
}
