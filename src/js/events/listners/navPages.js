import { get } from "../../api/requests/get.js";
import { renderListings } from "../../templates/renderListings.js";
import { search } from "./onSearch.js";
import { updateCurrentPageDisplay, updatePaginationBtns } from "./pagination.js";

const feed = document.getElementById("feed");
// const searchInput = document.getElementById("searchbar");
// let query;
let page = 1;

// if (pathname.includes("feed")) {
//   query = searchInput.value;
// }

export function listenForPageTurn(nxtbtn, prvbtn) {
  let query;
  const pathname = window.location.pathname;
  const searchInput = document.getElementById("searchbar");

  nxtbtn.addEventListener("click", async () => {
    if (pathname === "/" || pathname.includes("feed")) {
      query = searchInput.value;
    }

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
  const searchInput = document.getElementById("searchbar");
  searchInput.addEventListener("input", async () => {
    page = 1;
    updateCurrentPageDisplay(page);
    search(page);
  });
}
