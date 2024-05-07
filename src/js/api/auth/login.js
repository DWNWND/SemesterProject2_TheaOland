import { callApiWith } from "../apiCall.js";
import { API_BASE, API_LOGIN } from "../../constants/index.js";
import { save } from "../../storage/index.js";
//add a call to fetch the api key??

export async function login(email, password) {
  const url = API_BASE + API_LOGIN;
  const response = await callApiWith(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    const result = await response.json();
    const { accessToken, ...profile } = result.data;
    save("token", accessToken);
    save("profile", profile);

    //checking if its on the deployed site or locally
    const pathname = window.location.pathname;
    if (pathname.toLowerCase().includes("/semesterproject2_theaoland/")) {
      location.pathname = "/SemesterProject2_TheaOland/";
    } else {
      location.pathname = "/";
    }
    return;
  }
  if (response.status === 401) {
    throw new Error("Email and/or password does not match.");
  } else if (response.status === 400 || response.status >= 402) {
    throw new Error("An unexpected error occured, please try again later.", response.statusText);
  }
}
