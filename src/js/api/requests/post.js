import { callApiWith } from "../apiCall.js";
import { API_LISTINGS } from "../../constants/index.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { load } from "../../storage/load.js";

const userFeedbackContainer = document.getElementById("userFeedback");

export async function publishListing(listing) {
  const url = API_LISTINGS;

  const response = await callApiWith(url, {
    method: "POST",
    body: JSON.stringify(listing),
  });

  if (response.status === 201) {
    const publishBtn = document.getElementById("submit");
    publishBtn.disabled = true;

    userFeedback("listing successfully published", userFeedbackContainer);
    userFeedbackContainer.classList.add("text-grayish-purple");
    console.log("listing posted", response.status);

    setTimeout(function () {
      const pathname = window.location.pathname;
      if (pathname.toLowerCase().includes("/semesterproject2_theaoland/")) {
        location.pathname = "/SemesterProject2_TheaOland/";
      } else {
        location.pathname = "/";
      }
    }, 2000);
  }
  if (response.status === 400) {
    userFeedbackContainer.classList.remove("text-grayish-purple");
    throw new Error("You are trying to publish an empty listing.");
  } else if (response.status >= 401) {
    userFeedbackContainer.classList.remove("text-grayish-purple");
    throw new Error("An unexpected error occured, please try again later");
  }
}

export async function publishNewBid(listingID, bid) {
  const bidFeedbackContainer = document.getElementById("bidFeedback");
  const url = API_LISTINGS + `${listingID}/bids`;

  try {
    const response = await callApiWith(url, {
      method: "POST",
      body: JSON.stringify(bid),
    });

    if (response.status === 201) {
      console.log("Bid accepted", response);
      bidFeedbackContainer.classList.add("text-success");
      const userFeedbackMessage = "Bid accepted";
      userFeedback(userFeedbackMessage, bidFeedbackContainer);

      setTimeout(function () {
        location.reload();
      }, 2000);
    }
    if (response.status === 400) {
      bidFeedbackContainer.classList.add("text-error");
      throw new Error("Bid not accepted: Make sure that the listing is active and your bid is higher than the current bid.");
    }
    if (response.status === 403) {
      bidFeedbackContainer.classList.add("text-error");
      throw new Error("You can not bid on your own listing");
    } else if (response.status >= 401) {
      bidFeedbackContainer.classList.add("text-error");
      throw new Error("Bid not accepted: An unexpected error occured, please try again later");
    }
  } catch (error) {
    console.log(error);
    userFeedback(error, bidFeedbackContainer);
  }
}
