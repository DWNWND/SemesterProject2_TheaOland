import { get } from "../../api/requests/get.js";
import { load } from "../../storage/_index.js";
import { updateCurrentPageDisplay, updatePaginationBtns, search, renderListings } from "../events/_index.js";

let page = 1;

/**
 * The function listens for a page turn and feeds it back into update the pagination, the navPages buttons and renders the listings from the current page.
 * Its neccessary to keep the "let page" for this function and the listenForSearch function on the same page for the pagination to work correctly also when using the searchfield.
 *
 * @param {string} nextbtn The next page btn, html element
 * @param {string} prvbtn The previous page btn, html element

 * @uses updateCurrentPageDisplay To update the pagination
 * @uses updatePaginationBtns To update the display of the next and previous buttons
 * @uses get To get the listings pr. page from the server
 * @uses load To check if a user is logged in
 * @uses renderListings To render the listings
 */
export function listenForPageTurn(nxtbtn, prvbtn) {
  const feed = document.getElementById("feed");

  try {
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
      if (pathname === "/SemesterProject2_TheaOland/" || pathname === "/index.html" || pathname === "/" || pathname.includes("feed")) {
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
      if (pathname === "/SemesterProject2_TheaOland/" || pathname === "/index.html" || pathname === "/" || pathname.includes("feed")) {
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
  } catch (error) {
    console.log(error);
  }
}

/**
 * The function listens for a search input, executes the search function a and updated the pagination.
 * Its neccessary to keep the "let page" for this function and the listenForPageTurn function on the same page for the pagination to work correctly also when using the searchfield.
 *
 * @uses updateCurrentPageDisplay To update the pagination
 * @uses search To display the listings form the search
 */
export async function listenForSearch() {
  const searchInput = document.getElementById("searchbar");
  searchInput.addEventListener("input", async () => {
    page = 1;
    updateCurrentPageDisplay(page);
    search(page);
  });
}
