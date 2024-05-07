import { load } from "../storage/load.js";
import { navTemplate } from "../templates/nav.js";
import { userFeedback } from "../ui/components/errors/userFeedback.js";
import { get } from "../api/requests/get.js";
import { listingSpecificTemplate } from "../templates/listing.js";

const profile = load("profile");
const feedbackContainer = document.getElementById("feedbackContainer");
const uxElement = document.getElementById("uxElement");

//getting the IDs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("key");

export async function generateListingSpesific() {
  try {
    const username = profile.name;
    navTemplate(username);
    const listing = await get("singleListing", listingID);
    listingSpecificTemplate(listing);
    uxElement.innerHTML = "";
  } catch (error) {
    console.log(error);
    userFeedback(error, feedbackContainer);
  }
}
