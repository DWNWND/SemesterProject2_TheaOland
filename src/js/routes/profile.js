import { load } from "../storage/load.js";
import { navTemplate } from "../templates/nav.js";
import { userFeedback } from "../ui/components/errors/userFeedback.js";
import { get } from "../api/requests/get.js";
import { renderProfileListings, profileTemplate } from "../templates/profile.js";
import { logoutFunctionality } from "../events/listners/logout.js";

const profile = load("profile");
const feedbackContainer = document.getElementById("feedbackContainer");
const uxElement = document.getElementById("uxElement");
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
    uxElement.innerHTML = "";

    const logoutBtn = document.getElementById("logoutBtn");
    logoutFunctionality(logoutBtn);

    profileTemplate(userProfile);
    renderProfileListings(listings, profileListingsContainer);
  } catch (error) {
    console.log(error);
    userFeedback(error, feedbackContainer);
  }
}