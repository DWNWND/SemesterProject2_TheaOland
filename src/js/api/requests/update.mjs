import { callApiWith } from "../apiCall.mjs";
import { API_LISTINGS, API_PROFILES } from "../../constants/index.mjs";
import { userFeedback } from "../../ui/components/errors/userFeedback.mjs";

let errorMessage;

export async function updateListing(listing) {
  try {
    const errorContainer = document.querySelector("");

    if (!listing.id) {
      throw new Error("Update is missing a listingID");
    }

    const url = API_LISTINGS + `${listing.id}`;
    const response = await callApiWith(url, {
      method: "PUT",
      body: JSON.stringify(listing),
    });

    if (response.ok) {
      errorMessage = "The listing was updated";
      errorContainer.classList.add("success");
      userFeedback(errorMessage, errorContainer);
      setTimeout(function () {
        location.reload();
      }, 2000);
    } else {
      errorMessage = "An unexpected error occured, please try again later";
      errorContainer.classList.add("error");
      userFeedback(errorMessage, errorContainer);
      throw new Error("Couln't update listing");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile(userProfile) {
  try {
    const errorContainer = document.querySelector("");

    if (!userProfile.name) {
      throw new Error("Update is missing a username");
    }

    const url = API_PROFILES + `${userProfile.name}`;
    const response = await callApiWith(url, {
      method: "PUT",
      body: JSON.stringify(userProfile),
    });

    if (response.ok) {
      errorMessage = "Your profile was updated";
      errorContainer.classList.add("success");
      userFeedback(errorMessage, errorContainer);
      setTimeout(function () {
        location.reload();
      }, 2000);
    } else {
      errorMessage = "An unexpected error occured, please try again later";
      errorContainer.classList.add("error");
      userFeedback(errorMessage, errorContainer);
      throw new Error("Couln't update userprofile");
    }
  } catch (error) {
    console.log(error);
  }
}
