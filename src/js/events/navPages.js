import { get } from "../api/requests/get.js";
import { renderListings } from "../templates/renderListings.js";
import { search } from "./onSearch.js";
import { load } from "../storage/load.js";
import { updateCurrentPageDisplay, updatePaginationBtns } from "./pagination.js";

const feed = document.getElementById("feed");
let page = 1;

export function listenForPageTurn(nxtbtn, prvbtn) {
  let query;
  const pathname = window.location.pathname;
  const searchInput = document.getElementById("searchbar");

  nxtbtn.addEventListener("click", async () => {
    page++;
    updateCurrentPageDisplay(page);
    updatePaginationBtns(nxtbtn, prvbtn, page);

    if (pathname.includes("allListings")) {
      const profile = load("profile");
      const listings = await get("listingsByProfile", page, profile.name);
      renderListings(listings, feed);
    }
    if (pathname === "/" || pathname.includes("feed")) {
      query = searchInput.value;
      if (!query || query === "") {
        const listings = await get("listingsByPage", page);
        renderListings(listings, feed);
      }
      if (query) {
        const listings = await get("listingsBySearch", page, query);
        renderListings(listings, feed);
      }
    }
    window.scrollTo(0, 0);
  });
  prvbtn.addEventListener("click", async () => {
    page--;
    updateCurrentPageDisplay(page);
    updatePaginationBtns(nxtbtn, prvbtn, page);

    if (pathname.includes("allListings")) {
      const profile = load("profile");
      const listings = await get("listingsByProfile", page, profile.name);
      renderListings(listings, feed);
    }
    if (pathname === "/" || pathname.includes("feed")) {
      query = searchInput.value;

      if (!query || query === "") {
        const listings = await get("listingsByPage", page);
        renderListings(listings, feed);
      }
      if (query) {
        const listings = await get("listingsBySearch", page, query);
        renderListings(listings, feed);
      }
    }
    window.scrollTo(0, 0);
  });
}

export async function listenForSearch() {
  const searchInput = document.getElementById("searchbar");
  searchInput.addEventListener("input", async () => {
    page = 1;
    updateCurrentPageDisplay(page);
    search(page);
  });
}
