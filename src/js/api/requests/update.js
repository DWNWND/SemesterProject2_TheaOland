import { callApiWith } from "../apiCall.js";
import { API_LISTINGS, API_PROFILES } from "../../constants/apiParams.js";
import { navigateBack } from "../../handlers/events/_index.js";
import { userFeedback } from "../../ui/userFeedback/_index.js";

export async function updateListing(listing, listingID) {
  const userFeedbackContainer = document.getElementById("feedbackContainerOnAction");
  const loaderContainerOnAction = document.getElementById("loaderContainerOnAction");

  try {
    if (!listingID) {
      userFeedbackContainer.classList.remove("uppercase");
      userFeedbackContainer.classList.add("text-error");
      throw new Error("Update is missing a listingID");
    }
    const url = API_LISTINGS + `${listingID}`;
    const response = await callApiWith(url, {
      method: "PUT",
      body: JSON.stringify(listing),
    });
    if (response.ok) {
      loaderContainerOnAction.style.display = "none";
      userFeedbackContainer.classList.add("text-success", "uppercase");
      userFeedback("listing successfully updated", userFeedbackContainer);

      setTimeout(function () {
        const pathname = window.location.pathname;
        if (pathname.toLowerCase().includes("/semesterproject2_theaoland/")) {
          location.pathname = "/SemesterProject2_TheaOland/";
        } else {
          location.pathname = "/";
        }
      }, 2000);
    } else {
      userFeedbackContainer.classList.remove("uppercase");
      userFeedbackContainer.classList.add("text-error");
      throw new Error("Couln't update listing");
    }
  } catch (error) {
    console.log(error);
    loaderContainerOnAction.style.display = "none";
    userFeedback(error, userFeedbackContainer);
  }
}

export async function updateProfile(userProfile) {
  const userFeedbackContainer = document.getElementById("userFeedbackContainer");
  const saveBtn = document.getElementById("saveBtn");
  const backBtn = document.getElementById("backBtn");
  saveBtn.disabled = true;
  backBtn.disabled = true;

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
      const loaderContainer = document.getElementById("loaderContainer");
      loaderContainer.style.display = "none";

      const result = await response.json();
      const updatedProfile = result.data;

      userFeedbackContainer.classList.add("text-success");
      userFeedback("profile successfully updated", userFeedbackContainer);

      setTimeout(function () {
        const profileElement = document.getElementById("profileElement");
        navigateBack(profileElement, updatedProfile);
      }, 2000);
    } else {
      throw new Error("Couln't update userprofile");
    }
  } catch (error) {
    console.log(error);
    userFeedbackContainer.classList.add("text-error");
    userFeedback(error, userFeedbackContainer);
  }
}
