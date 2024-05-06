import { renderListings, startFeed } from "../../routes/feed.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { get } from "../../api/requests/get.js";

let query;
let page = 1;
let feedbackMessage = "";
const feedbackContainer = document.getElementById("feedbackContainer");
const feed = document.getElementById("feed");

export async function search() {
  const searchInput = document.getElementById("searchbar");
  searchInput.addEventListener("input", async () => {
    query = searchInput.value;
    if (query) {
      const listingsBySearch = await get("listingsBySearch", page, query);
      if (listingsBySearch.length >= 0) {
        renderListings(listingsBySearch, feed);
        feedbackMessage = "";
      }
      if (listingsBySearch.length === 0) {
        feedbackMessage = "there's no listings matching this search.";
        feed.innerHTML = "";
      }
      userFeedback(feedbackMessage, feedbackContainer);
    } else if (!query || query === "") {
      startFeed();
    }
  });
}
