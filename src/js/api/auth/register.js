import { callApiWith } from "../apiCall.js";
import { API_BASE, API_REGISTER } from "../../constants/apiParams.js";
import { login } from "./index.js";

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
    throw new Error("There is already an account with these credentials, try logging in instead.");
  } else if (response.status >= 401) {
    throw new Error("An unexpected error occured, please try again later.");
  }
}
