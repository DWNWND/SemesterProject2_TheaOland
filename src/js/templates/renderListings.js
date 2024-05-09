import { load } from "../storage/index.js";
import { listingsTemplate } from "./listings.js";

export function renderListings(listingsArray, container) {
  const uxElementMain = document.getElementById("uxElementMain");
  const token = load("token");

  // if (listingsArray.length === 0 || !listingsArray) {
  //   throw new Error("there's no more listings in this search.");
  // }

  container.innerHTML = "";
  const pathname = window.location.pathname;

  if (pathname.includes("profile")) {
    const heading = document.createElement("h1");
    heading.innerText = "my latest listings";
    heading.classList.add("heading-4", "text-red", "text-center");
    container.append(heading);
  }

  for (let i = 0; i < listingsArray.length; i++) {
    container.append(listingsTemplate(listingsArray[i], token));
  }

  uxElementMain.innerHTML = "";

  if (pathname === "/" || pathname.includes("feed") || pathname.includes("allListings")) {
    const navPages = document.getElementById("navPages");
    const paginationElement = document.getElementById("paginationElement");
    navPages.style.display = "block";
    paginationElement.style.display = "block";
  }

  if (pathname.includes("profile")) {
    const allListings = document.createElement("a");
    allListings.innerText = "view all my listings";
    allListings.setAttribute("href", "/allListings/index.html");
    allListings.classList.add("text-red", "text-center", "pb-4");
    container.append(allListings);
  }

  if (pathname === "/" || pathname.includes("feed")) {
    const searchElement = document.getElementById("searchElement");
    searchElement.style.display = "block";
  }
}
