import { load } from "../storage/_index.js";
import { navTemplate } from "../templates/_index.js";
import { get } from "../api/requests/get.js";
import { listenForUpdate, listenForDelete, listenForPublish, listenForAddImg } from "../handlers/listners/_index.js";
import { populateEditForm } from "../handlers/events/_index.js";

const addImgsBtn = document.getElementById("addImgsBtn");
const deleteBtn = document.getElementById("deleteBtn");
const profile = load("profile");
const username = profile.name;

//getting the IDs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("key");

export async function generateEdit() {
  try {
    navTemplate(username);
    listenForAddImg(addImgsBtn);
    const metaTitle = document.querySelector("title");

    if (listingID) {
      deleteBtn.style.display = "block";
      const listing = await get("singleListing", listingID);
      metaTitle.innerText = "Edit listing: " + listing.title + " | BAZAAR";

      if (!listing.endsAt) {
        const deadlineInput = document.getElementById("deadlineInput");
        deadlineInput.required;
      }
      populateEditForm(listing);
      listenForUpdate(listingID);
      listenForDelete(listingID);
    }
    if (!listingID) {
      deleteBtn.style.display = "none";
      listenForPublish();
    }
  } catch (error) {
    console.log(error);
  }
}
