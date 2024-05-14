import { get } from "../api/requests/get.js";
import { load } from "../storage/_index.js";
import { navTemplate, listingSpecificTemplate } from "../templates/_index.js";
import { userFeedback } from "../ui/userFeedback/_index.js";

const profile = load("profile");
const feedbackContainer = document.getElementById("userFeedbackMain");
const uxElement = document.getElementById("uxElement");
const pageContent = document.getElementById("listingContainer");

//getting the IDs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("key");

export async function generateListingSpesific() {
  try {
    const username = profile.name;
    navTemplate(username);
    const listing = await get("singleListing", listingID);
    // uxElement.innerHTML = "";
    const metaTitle = document.querySelector("title");
    console.log(metaTitle);
    metaTitle.innerText = listing.title + " | BAZAAR";
    listingSpecificTemplate(listing);
  } catch (error) {
    pageContent.innerHTML = "";
    uxElement.innerHTML = "";
    console.log(error);
    userFeedback(error, feedbackContainer);
  }
}
