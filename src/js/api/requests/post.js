import { callApiWith } from "../apiCall.js";
import { API_LISTINGS } from "../../constants/apiParams.js";
import { userFeedback } from "../../ui/userFeedback/_index.js";
import { baseRepoUrl } from "../../constants/baseUrl.js";
import { checkIfDeployed } from "../../tools/checkUrl.js";

export async function publishListing(listing) {
  const feedbackContainerOnAction = document.getElementById("feedbackContainerOnAction");
  const loaderContainerOnAction = document.getElementById("loaderContainerOnAction");
  const url = API_LISTINGS;

  try {
    const response = await callApiWith(url, {
      method: "POST",
      body: JSON.stringify(listing),
    });

    if (response.status === 201) {
      loaderContainerOnAction.style.display = "none";
      userFeedback("listing successfully published", feedbackContainerOnAction);
      feedbackContainerOnAction.classList.add("text-grayish-purple");

      setTimeout(function () {
        const deployed = checkIfDeployed();
        if (deployed) {
          location.pathname = `${baseRepoUrl}`;
        }
        if (!deployed) {
          location.pathname = "/";
        }
      }, 2000);
    }
    if (response.status === 400) {
      throw new Error("You are trying to publish a listing lacking required fields. Please make sure you have filled out all required fields and that you have a valid deadline date.");
    } else if (response.status >= 401) {
      throw new Error("An unexpected error occured, please try again later");
    }
  } catch (error) {
    console.log(error);
    feedbackContainerOnAction.classList.remove("text-grayish-purple");
    loaderContainerOnAction.style.display = "none";
    userFeedback(error, feedbackContainerOnAction);
  }
}

export async function publishNewBid(listingID, bid) {
  const bidFeedbackContainer = document.getElementById("bidFeedback");
  const url = API_LISTINGS + `/${listingID}/bids`;

  try {
    const response = await callApiWith(url, {
      method: "POST",
      body: JSON.stringify(bid),
    });

    if (response.status === 201) {
      bidFeedbackContainer.classList.add("success", "text-uppercase");
      const userFeedbackMessage = "Bid accepted";
      userFeedback(userFeedbackMessage, bidFeedbackContainer);

      setTimeout(function () {
        location.reload();
      }, 2000);
    }
    if (response.status === 400) {
      throw new Error("Bid not accepted: Make sure that the listing is active and your bid is higher than the current bid.");
    }
    if (response.status === 403) {
      throw new Error("You can not bid on your own listing");
    } else if (response.status >= 401) {
      throw new Error("Bid not accepted: An unexpected error occured, please try again later");
    }
  } catch (error) {
    bidFeedbackContainer.classList.remove("text-uppercase");
    bidFeedbackContainer.classList.add("text-error");
    console.log(error);
    userFeedback(error, bidFeedbackContainer);
  }
}
