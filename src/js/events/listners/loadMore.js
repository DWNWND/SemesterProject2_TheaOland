import { renderListings } from "../../routes/feed.js";
import { get } from "../../api/requests/get.js";

const feed = document.getElementById("feed");
let page = 1;

export function loadMoreListings(btn) {
  btn.addEventListener("click", async () => {
    // btn.style.display = "none"; //disable the btn in some kind of way when its clicked?
    page++;
    const listings = await get("listingsByPage", page);
    renderListings(listings, feed);
    // btn.style.display = "block";
  });
}
