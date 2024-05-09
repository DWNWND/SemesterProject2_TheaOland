import { load } from "../storage/load.js";
import { navTemplate } from "../templates/nav.js";
import { userFeedback } from "../ui/components/errors/userFeedback.js";
import { get } from "../api/requests/get.js";
import { profileTemplate } from "../templates/profile.js";
import { renderListings } from "../templates/renderListings.js";
const profile = load("profile");
const feedbackContainer = document.getElementById("feedbackContainer");
const uxElementMain = document.getElementById("uxElementMain");
const profileListingsContainer = document.getElementById("profileListingsContainer");

export async function generateUserProfile() {
  try {
    const username = profile.name;
    navTemplate(username);
    const userProfile = await get("singleProfile", username);
    const listingsArray = await get("listingsByProfile", username);
    uxElementMain.innerHTML = "";
    profileTemplate(userProfile);
    renderListings(listingsArray, profileListingsContainer);
  } catch (error) {
    console.log(error);
    userFeedback(error, feedbackContainer);
  }
}
