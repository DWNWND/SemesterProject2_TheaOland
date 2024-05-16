import { get } from "../api/requests/get.js";
import { load } from "../storage/_index.js";
import { navTemplate, profileTemplate } from "../templates/_index.js";
import { renderListings } from "../handlers/events/_index.js";
import { userFeedback } from "../ui/userFeedback/_index.js";
import { displayWins, displayBids } from "../templates/_index.js";

const profile = load("profile");
const feedbackContainer = document.getElementById("feedbackContainer");
// const uxElementMain = document.getElementById("uxElementMain");
const profileListingsContainer = document.getElementById("profileListingsContainer");

export async function generateUserProfile() {
  try {
    const username = profile.name;
    navTemplate(username);
    const userProfile = await get("singleProfile", username);
    const listingsArray = await get("listingsByProfile", username);
    const metaTitle = document.querySelector("title");
    metaTitle.innerText = username + " | BAZAAR";
    // uxElementMain.innerHTML = "";
    displayBids(username);
    displayWins(username);
    profileTemplate(userProfile);
    renderListings(listingsArray, profileListingsContainer);
  } catch (error) {
    console.log(error);
    userFeedback(error, feedbackContainer);
  }
}
