import { callApiWith } from "../apiCall.js";
import { API_LISTINGS } from "../../constants/apiParams.js";
import { userFeedback } from "../../ui/userFeedback/userFeedback.js";

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
      const pathname = window.location.pathname;
      if (pathname.toLowerCase().includes("/semesterproject2_theaoland/")) {
        location.pathname = "/SemesterProject2_TheaOland/";
      } else {
        location.pathname = "/";
      }
    }, 2000);
  } else {
    throw new Error("Something went wrong when contacting the API");
  }
}

export function removeUrlParameter(paramKey) {
  const url = window.location.href;
  var currentUrl = new URL(url);
  currentUrl.searchParams.delete(paramKey);
  const newUrl = currentUrl.href;
  window.history.pushState({ path: newUrl }, "", newUrl);
}
