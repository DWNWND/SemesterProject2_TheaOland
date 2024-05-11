import { search, updateCurrentPageDisplay } from "../events/_index.js";

let page;

export async function listenForSearch() {
  const searchInput = document.getElementById("searchbar");
  searchInput.addEventListener("input", async () => {
    page = 1;
    updateCurrentPageDisplay(page);
    search(page);
  });
}
