import { callApiWith } from "../apiCall.js";
import { API_LISTINGS, API_PROFILES } from "../../constants/index.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { navigateBack } from "../../templates/profile.js";

export async function updateListing(listing, listingID) {
  const userFeedbackContainer = document.getElementById("userFeedbackContainer");

  try {
    if (!listing.id) {
      throw new Error("Update is missing a listingID");
    }
    const url = API_LISTINGS + `${listingID}`;
    const response = await callApiWith(url, {
      method: "PUT",
      body: JSON.stringify(listing),
    });
    if (response.ok) {
      userFeedbackContainer.classList.add("text-success");
      userFeedback("listing successfully updated", userFeedbackContainer);
      // const uxElementSecondary = document.getElementById("uxElementSecondary");
      // uxElementSecondary.innerHTML = `<span id="loader" class="loader"><span class="visually-hidden">Loading...</span></span>`;

      setTimeout(function () {
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
  } catch (error) {
    userFeedbackContainer.classList.add("text-error");
    userFeedback(error, userFeedbackContainer);
  }
}

export async function updateProfile(userProfile) {
  const userFeedbackContainer = document.getElementById("userFeedbackContainer");
  try {
    if (!userProfile.name) {
      throw new Error("Update is missing a username.");
    }
    const url = API_PROFILES + `${userProfile.name}`;
    const response = await callApiWith(url, {
      method: "PUT",
      body: JSON.stringify(userProfile),
    });
    if (response.ok) {
      const saveBtn = document.getElementById("saveBtn");
      saveBtn.disabled = true;

      const result = await response.json();
      const updatedProfile = result.data;

      userFeedbackContainer.classList.add("text-success");
      userFeedback("profile successfully updated", userFeedbackContainer);

      const uxElementSecondary = document.getElementById("uxElementSecondary");

      console.log(uxElementSecondary);
      uxElementSecondary.innerHTML = `<span id="loader" class="loader"><span class="visually-hidden">Loading...</span></span>`;

      setTimeout(function () {
        const profileElement = document.getElementById("profileElement");
        navigateBack(profileElement, updatedProfile);
      }, 2000);
    } else {
      throw new Error("Couln't update userprofile");
    }
  } catch (error) {
    userFeedbackContainer.classList.add("text-error");
    userFeedback(error, userFeedbackContainer);
  }
}
