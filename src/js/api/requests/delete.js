import { callApiWith } from "../apiCall.js";
import { API_LISTINGS } from "../../constants/apiParams.js";
import { userFeedback } from "../../ui/userFeedback/userFeedback.js";
import { baseRepoUrl } from "../../constants/baseUrl.js";
import { removeUrlParameter, checkIfDeployed } from "../../tools/_index.js";

export async function deleteListing(id) {
  const feedbackContainerOnAction = document.getElementById("feedbackContainerOnAction");
  const loaderContainerOnAction = document.getElementById("loaderContainerOnAction");

  if (!id) {
    throw new Error("Delete is missing a listingID");
  }
  const url = API_LISTINGS + `/${id}`;
  const response = await callApiWith(url, {
    method: "DELETE",
  });
  if (response.ok) {
    loaderContainerOnAction.style.display = "none";
    userFeedback("listing successfully deleted", feedbackContainerOnAction);
    feedbackContainerOnAction.classList.add("text-grayish-purple");

    setTimeout(function () {
      removeUrlParameter("key");

      const deployed = checkIfDeployed();
      if (deployed) {
        location.pathname = `${baseRepoUrl}`;
      }
      if (!deployed) {
        location.pathname = "/";
      }
    }, 2000);
  } else {
    throw new Error("Something went wrong when contacting the API");
  }
}
