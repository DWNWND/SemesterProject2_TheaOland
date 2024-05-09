import { load } from "../storage/load.js";
import { navTemplate } from "../templates/nav.js";
import { userFeedback } from "../ui/components/errors/userFeedback.js";
import { get } from "../api/requests/get.js";
import { listingSpecificTemplate } from "../templates/listing.js";

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
    uxElement.innerHTML = "";
    const username = profile.name;
    navTemplate(username);
    const listing = await get("singleListing", listingID);
    listingSpecificTemplate(listing);
  } catch (error) {
    pageContent.innerHTML = "";
    uxElement.innerHTML = "";
    console.log(error);
    userFeedback(error, feedbackContainer);
  }
}
