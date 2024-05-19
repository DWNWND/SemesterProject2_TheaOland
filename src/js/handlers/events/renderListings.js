import { load } from "../../storage/_index.js";
import { listingsTemplate } from "../../templates/listings.js";
import { checkIfDeployed } from "../../tools/checkUrl.js";
import { generateBtn } from "../../templates/btns.js";

export function renderListings(listingsArray, container) {
  const token = load("token");

  container.innerHTML = "";
  const pathname = window.location.pathname;

  if (pathname.includes("profile")) {
    const heading = document.createElement("h1");
    heading.innerText = "my latest listings";
    heading.classList.add("heading-1", "text-red", "text-center");
    container.append(heading);
  }

  for (let i = 0; i < listingsArray.length; i++) {
    container.append(listingsTemplate(listingsArray[i], token));
  }

  if (pathname === "/SemesterProject2_TheaOland/" || pathname === "/" || pathname.includes("feed") || pathname.includes("allListings")) {
    const paginationElement = document.getElementById("paginationElement");
    paginationElement.style.display = "block";
  }

  if (pathname.includes("profile")) {
    let link;
    const deployed = checkIfDeployed();
    if (deployed) {
      link = "../allListings/index.html";
    }
    if (!deployed) {
      link = "/allListings/index.html";
    }
    const allListingsBtn = generateBtn("allListings", "all my listings", link);
    // allListings.classList.add("text-red", "text-center", "pb-4");
    container.append(allListingsBtn);
  }

  if (pathname === "/SemesterProject2_TheaOland/" || pathname === "/index.html" || pathname === "/" || pathname.includes("feed")) {
    const searchElement = document.getElementById("searchElement");
    searchElement.style.display = "block";
  }
}
