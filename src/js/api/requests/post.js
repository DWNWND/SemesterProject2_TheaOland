import { callApiWith } from "../apiCall.js";
import { API_LISTINGS } from "../../constants/index.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { load } from "../../storage/load.js";

const userFeedbackContainer = document.getElementById("userFeedback");
const profile = load("profile");
const username = profile.name;

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
    throw new Error("You are trying to publish an empty listing.");
  } else if (response.status >= 401) {
    throw new Error("An unexpected error occured, please try again later");
  }
}

// example listing to publish newBid;
// const bid = {
//   amount: 0, // Required
// };

export async function publishNewBid(listing, bid) {
  try {
    const url = API_LISTINGS + `${listing.id}/bids`;
    const response = await callApiWith(url, {
      method: "POST",
      body: JSON.stringify(bid),
    });

    if (response.status === 201) {
      location.reload();
    }
    if (response.status === 400) {
      // errorMessage = "You are trying to publish an empty bid.";
      // userFeedback(errorMessage, errorContainer);
    } else if (response.status >= 401) {
      // errorMessage = "An unexpected error occured, please try again later";
      // userFeedback(errorMessage, errorContainer);
      throw new Error("Unknown error");
    }
  } catch (error) {
    console.log(error);
  }
}
