import { load } from "../storage/load.js";
import { navTemplate } from "../templates/nav.js";
import { userFeedback } from "../ui/components/errors/userFeedback.js";
import { get } from "../api/requests/get.js";
import { renderProfileListings, profileTemplate } from "../templates/profile.js";
const profile = load("profile");
const feedbackContainer = document.getElementById("feedbackContainer");
const uxElementMain = document.getElementById("uxElementMain");
const profileListingsContainer = document.getElementById("profileListingsContainer");

//getting the IDs
// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const username = params.get("key");

export async function generateUserProfile() {
  try {
    const username = profile.name;
    navTemplate(username);
    const userProfile = await get("singleProfile", username);
    const listings = await get("listingsByProfile", username);
    uxElementMain.innerHTML = "";
    profileTemplate(userProfile);
    renderProfileListings(listings, profileListingsContainer);
  } catch (error) {
    console.log(error);
    userFeedback(error, feedbackContainer);
  }
}
