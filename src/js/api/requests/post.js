import { callApiWith } from "../apiCall.mjs";
import { API_LISTINGS } from "../../constants/index.mjs";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";

let errorMessage;

export async function publishListing(listing) {
  const errorContainer = document.querySelector("");

  try {
    const url = API_LISTINGS;
    const response = await callApiWith(url, {
      method: "POST",
      body: JSON.stringify(listing),
    });
    if (response.status === 201) {
      location.reload();
    }
    if (response.status === 400) {
      errorMessage = "You are trying to publish an empty listing.";
      userFeedback(errorMessage, errorContainer);
    } else if (response.status >= 401) {
      errorMessage = "An unexpected error occured, please try again later";
      userFeedback(errorMessage, errorContainer);
      throw new Error("Unknown error");
    }
  } catch (error) {
    console.log(error);
  }
}

// example listing to publish newBid;
// const bid = {
//   amount: 0, // Required
// };

export async function publishNewBid(listing, bid) {
  const errorContainer = document.querySelector("");

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
      errorMessage = "You are trying to publish an empty bid.";
      userFeedback(errorMessage, errorContainer);
    } else if (response.status >= 401) {
      errorMessage = "An unexpected error occured, please try again later";
      userFeedback(errorMessage, errorContainer);
      throw new Error("Unknown error");
    }
  } catch (error) {
    console.log(error);
  }
}
