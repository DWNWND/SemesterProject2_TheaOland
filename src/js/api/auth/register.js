import { callApiWith } from "../apiCall.js";
import { API_BASE, API_REGISTER } from "../../constants/index.js";
import { login } from "./index.js";
import { userFeedback } from "../../ui/userFeedback/_index.js";

let feedbackMessage;
const errorContainer = document.getElementById("userFeedback");

export async function register(name, email, password) {
  const url = API_BASE + API_REGISTER;
  const response = await callApiWith(url, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.status === 201) {
    login(email, password);
    return;
  }

  if (response.status === 400) {
    feedbackMessage = "There is already an account with these credentials, try logging in instead";
    userFeedback(feedbackMessage, errorContainer);
    throw new Error("There is already an account with these credentials");
  } else if (response.status >= 401) {
    feedbackMessage = "An unexpected error occured, please try again later";
    userFeedback(feedbackMessage, errorContainer);
    throw new Error("Unknown error - from register function");
  }
}
