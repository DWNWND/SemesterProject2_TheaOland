import { get } from "../../api/requests/get.js";
import { renderListings } from "../../templates/renderListings.js";
import { search } from "./onSearch.js";
import { updateCurrentPageDisplay, updatePaginationBtns } from "./pagination.js";

const feed = document.getElementById("feed");
const searchInput = document.getElementById("searchbar");
let query;
let page = 1;

const pathname = window.location.pathname;
if (pathname.includes("feed")) {
  query = searchInput.value;
}

export function listenForPageTurn(nxtbtn, prvbtn) {
  nxtbtn.addEventListener("click", async () => {
    page++;
    updateCurrentPageDisplay(page);
    updatePaginationBtns(nxtbtn, prvbtn, page);

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
    page--;
    updateCurrentPageDisplay(page);
    updatePaginationBtns(nxtbtn, prvbtn, page);

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
}

export async function listenForSearch() {
  searchInput.addEventListener("input", async () => {
    page = 1;
    updateCurrentPageDisplay(page);
    search(page);
  });
}
