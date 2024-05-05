import { callApiWith } from "../apiCall.js";
import { API_BASE, API_LOGIN } from "../../constants/index.js";
import { save } from "../../storage/index.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";

let feedbackMessage;
const errorContainer = document.getElementById("userFeedback");

//add a call to fetch the api key??

export async function login(email, password) {
  const url = API_BASE + API_LOGIN;
  const response = await callApiWith(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    const result = await response.json();
    console.log(result.data);
    const { accessToken, ...profile } = result.data;
    save("token", accessToken);
    save("profile", profile);
    location.pathname = "/";
    return;
    // return profile;
  }
  if (response.status === 401) {
    feedbackMessage = "Email and/or password does not match.";
    userFeedback(feedbackMessage, errorContainer);
    throw new Error("Email and/or password does not match.");
  } else if (response.status === 400 || response.status >= 402) {
    feedbackMessage = "An unexpected error occured, please try again later.";
    userFeedback(feedbackMessage, errorContainer);
    throw new Error("An unexpected error occured, please try again later.", response.statusText);
  }
}
