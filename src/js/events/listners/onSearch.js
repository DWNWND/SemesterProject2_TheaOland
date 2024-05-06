import { renderListings, startFeed } from "../../routes/feed.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { get, currentPage } from "../../api/requests/get.js";
import { updatePagination } from "./pagination.js";

let query;
let page = 1;
let numberOfListings;
const feedbackContainer = document.getElementById("feedbackContainer");
const feed = document.getElementById("feed");

export async function search() {
  const searchInput = document.getElementById("searchbar");
  searchInput.addEventListener("input", async () => {
    updatePagination(currentPage);
    query = searchInput.value;
    try {
      if (query) {
        const listingsBySearch = await get("listingsBySearch", page, query);
        numberOfListings = listingsBySearch.length;

        if (numberOfListings > 1) {
          renderListings(listingsBySearch, feed);
          updatePagination(currentPage);
          // checkNavPagesBtns(currentPage);
        }
        if (numberOfListings <= 0) {
          updatePagination(0);
          // checkNavPagesBtns(0);
          feed.innerHTML = "";
          throw new Error("there's no listings matching this search.");
        }
      } else if (!query || query === "") {
        startFeed();
      }
    } catch (error) {
      // console.log(error);
      userFeedback(error, feedbackContainer);
    } finally {
      if (numberOfListings > 0) {
        userFeedback("", feedbackContainer);
      }
    }
  });
}
