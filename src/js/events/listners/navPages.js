import { renderListings } from "../../routes/feed.js";
import { get } from "../../api/requests/get.js";
import { totalPages, currentPage } from "../../api/requests/get.js";

const feed = document.getElementById("feed");
let page = 1;

export function navigatePages(nxtbtn, prvbtn) {
  nxtbtn.addEventListener("click", async () => {
    const searchInput = document.getElementById("searchbar");
    const query = searchInput.value;
    page++;

    console.log("total pages count:", totalPages);
    console.log("current page:", page);

    if (!query || query === "") {
      const listings = await get("listingsByPage", page);
      renderListings(listings, feed);
    }
    if (query) {
      const listings = await get("listingsBySearch", page, query);
      renderListings(listings, feed);
    }
    window.scrollTo(0, 0);
  });
  prvbtn.addEventListener("click", async () => {
    const searchInput = document.getElementById("searchbar");
    const query = searchInput.value;
    page--;

    console.log("total pages count:", totalPages);
    console.log("current page:", page);

    if (!query) {
      const listings = await get("listingsByPage", page);
      renderListings(listings, feed);
    }
    if (query) {
      const listings = await get("listingsBySearch", page, query);
      renderListings(listings, feed);
    }
    window.scrollTo(0, 0);
  });
}
