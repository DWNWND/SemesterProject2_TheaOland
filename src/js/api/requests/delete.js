import { callApiWith } from "../apiCall.js";
import { API_LISTINGS } from "../../constants/apiParams.js";

export async function deleteListing(id) {
  if (!id) {
    throw new Error("Delete is missing a listingID");
  }
  const url = API_LISTINGS + `${id}`;
  const response = await callApiWith(url, {
    method: "DELETE",
  });
  if (response.ok) {
    removeUrlParameter("key");
    const pathname = window.location.pathname;
    if (pathname.toLowerCase().includes("/semesterproject2_theaoland/")) {
      location.pathname = "/SemesterProject2_TheaOland/";
    } else {
      location.pathname = "/";
    }
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
