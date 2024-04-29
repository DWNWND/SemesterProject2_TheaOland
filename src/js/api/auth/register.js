import { callApiWith } from "../apiCall.js";
import { API_BASE, API_REGISTER } from "../../constants/index.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { login } from "./index.js";

let errorMessage;

export async function register(name, email, password) {
  const errorContainer = document.getElementById("userFeedback");

  try {
    const url = API_BASE + API_REGISTER;
    const response = await callApiWith(url, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (response.status === 201) {
      login(email, password);
    }

    if (response.status === 400) {
      errorMessage = "There is already an account with these credentials, try logging in instead";
      throw new Error("There is already an account with these credentials");
    } else if (response.status >= 401) {
      errorMessage = "An unexpected error occured, please try again later";
      throw new Error("Unknown error - from register function");
    }
  } catch (error) {
    userFeedback(errorMessage, errorContainer);
    console.log(error);
  }
}
