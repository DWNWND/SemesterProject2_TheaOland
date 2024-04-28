import { callApiWith } from "../apiCall.mjs";
import { API_LISTINGS } from "../../constants/index.mjs";
import { userFeedback } from "../../ui/components/errors/userFeedback.mjs";

let errorMessage;

export async function deleteListing(id) {
  const errorContainer = document.querySelector("");

  if (!id) {
    throw new Error("Delete is missing a listingID");
  }
  try {
    const url = API_LISTINGS + `${id}`;
    const response = await callApiWith(url, {
      method: "DELETE",
    });
    if (response.ok) {
      location.reload();
    } else {
      throw new Error("Something went wrong when contacting the API");
    }
  } catch (error) {
    errorMessage = error;
    userFeedback(errorMessage, errorContainer);
    console.log(error);
  }
}
