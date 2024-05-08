import { callApiWith } from "../apiCall.js";
import { API_LISTINGS, API_PROFILES } from "../../constants/index.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";

let errorMessage;

export async function updateListing(listing, listingID) {
  // const errorContainer = document.querySelector("");

  // if (!listing.id) {
  //   throw new Error("Update is missing a listingID");
  // }

  const url = API_LISTINGS + `${listingID}`;
  const response = await callApiWith(url, {
    method: "PUT",
    body: JSON.stringify(listing),
  });

  if (response.ok) {
    console.log("updated", response);
    // errorMessage = "The listing was updated";
    // errorContainer.classList.add("success");
    // userFeedback(errorMessage, errorContainer);
    // setTimeout(function () {
    //   location.reload();
    // }, 2000);
  } else {
    // errorMessage = "An unexpected error occured, please try again later";
    // errorContainer.classList.add("error");
    // userFeedback(errorMessage, errorContainer);
    throw new Error("Couln't update listing");
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
