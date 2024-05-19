import { get } from "../api/requests/get.js";
import { load } from "../storage/_index.js";
import { navTemplate, listingSpecificTemplate } from "../templates/_index.js";
import { userFeedback } from "../ui/userFeedback/_index.js";

const profile = load("profile");
const feedbackContainer = document.getElementById("userFeedbackContainer");
const pageContent = document.getElementById("auction-item");

//getting the IDs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("key");

export async function generateListingSpesific() {
  try {
    const username = profile.name;
    navTemplate(username);
    const listing = await get("singleListing", listingID);
    const metaTitle = document.querySelector("title");
    metaTitle.innerText = listing.title + " | BAZAAR";
    listingSpecificTemplate(listing);
  } catch (error) {
    console.log(error);
    pageContent.innerHTML = "";
    const userFeedbackMessage = "Error: An unexpected error occurred, please try again later. If the error persist please contact BAZAAR.";
    userFeedback(userFeedbackMessage, feedbackContainer);
  }
}
