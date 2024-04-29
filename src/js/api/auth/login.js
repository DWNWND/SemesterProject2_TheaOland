import { callApiWith } from "../apiCall.js";
import { API_BASE, API_LOGIN } from "../../constants/index.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";
import { save } from "../../storage/index.js";

let errorMessage;
const errorContainer = document.getElementById("userFeedback");

export async function login(email, password) {
  try {
    const url = API_BASE + API_LOGIN;

    const response = await callApiWith(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const { accessToken, ...profile } = (await response.json()).data;
      save("token", accessToken);
      save("profile", profile);

      console.log(profile);
      location.pathname = "/";
    }
    if (response.status === 401) {
      errorMessage = "Email and/or password does not match.";
      throw new Error("The server is not responding with a token");
    } else if (response.status === 400 || response.status >= 402) {
      errorMessage = "An unexpected error occured, please try again later";
      throw new Error("Unknown error - from login function");
    }
  } catch (error) {
    userFeedback(errorMessage, errorContainer);
    console.log(error);
  }
}
