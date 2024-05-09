import { callApiWith } from "../apiCall.js";
import { API_LISTINGS, API_PROFILES } from "../../constants/index.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { back } from "../../templates/profile.js";
import { load } from "../../storage/load.js";

export async function updateListing(listing, listingID) {
  const userFeedbackContainer = document.getElementById("userFeedbackContainer");

  if (!listing.id) {
    throw new Error("Update is missing a listingID");
  }
  const url = API_LISTINGS + `${listingID}`;
  const response = await callApiWith(url, {
    method: "PUT",
    body: JSON.stringify(listing),
  });
  if (response.ok) {
    console.log("listing updated", response);
    setTimeout(function () {
      userFeedback("listing successfully updated", userFeedbackContainer);
      const pathname = window.location.pathname;
      if (pathname.toLowerCase().includes("/semesterproject2_theaoland/")) {
        location.pathname = "/SemesterProject2_TheaOland/";
      } else {
        location.pathname = "/";
      }
    }, 2000);
  } else {
    throw new Error("Couln't update listing");
  }
}

export async function updateProfile(userProfile) {
  const userFeedbackContainer = document.getElementById("userFeedbackContainer");

  if (!userProfile.name) {
    throw new Error("Update is missing a username");
  }
  const url = API_PROFILES + `${userProfile.name}`;
  const response = await callApiWith(url, {
    method: "PUT",
    body: JSON.stringify(userProfile),
  });
  if (response.ok) {
    const result = await response.json();
    console.log("profile was updated", response);
    userFeedback("profile successfully updated", userFeedbackContainer);
    setTimeout(function () {
      const profileElement = document.getElementById("profileElement");
      back(profileElement, result.data);
    }, 2000);
  } else {
    throw new Error("Couln't update userprofile");
  }
}
