import { startFeed } from "../../routes/feed.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { updateTotalPageDisplay, updatePaginationBtns } from "./pagination.js";
import { renderListings } from "../../templates/renderListings.js";
import { get } from "../../api/requests/get.js";

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
  try {
    if (query) {
      const listingsBySearch = await get("listingsBySearch", page, query);
      numberOfListings = listingsBySearch.length;
      updateTotalPageDisplay();
      updatePaginationBtns(nxtBtn, prvBtn, page);

      if (numberOfListings >= 1) {
        renderListings(listingsBySearch, feed);
        paginationElement.style.display = "block";
      }
      if (numberOfListings <= 0) {
        paginationElement.style.display = "none";
        navPages.style.display = "none";
        feed.innerHTML = "";
        throw new Error("No listings match this search.");
      }
    } else if (!query || query === "") {
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
