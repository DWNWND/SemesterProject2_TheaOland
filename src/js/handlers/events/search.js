import { get } from "../../api/requests/get.js";
import { startFeed } from "../../routes/feedPage.js";
import { renderListings, updateTotalPageDisplay, updatePaginationBtns } from "./_index.js";
import { userFeedback } from "../../ui/userFeedback/_index.js";

/**
 * The function renders the listings by search.
 *
 * @param {number} page The page number
 *
 * @uses updateTotalPageDisplay To update the pagination
 * @uses updatePaginationBtns To update the next-page and previous-ppage buttons
 * @uses get To get the listings from the server by page
 * @uses renderListings To render the listings
 * @uses startFeed To go back to the startfeed if theres no search query
 * @uses userFeedback To display user feedback
 */
export async function search(page) {
  const feedbackContainer = document.getElementById("feedbackContainer");
  const nxtBtn = document.getElementById("nxtBtn");
  const prvBtn = document.getElementById("prvBtn");
  const navPages = document.getElementById("navPages");
  const searchInput = document.getElementById("searchbar");
  const paginationElement = document.getElementById("paginationElement");
  const feed = document.getElementById("feed");
  const mainHeading = document.getElementById("mainHeading");

  let query = searchInput.value;
  let numberOfListings;

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
