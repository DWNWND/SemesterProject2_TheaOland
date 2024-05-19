import { callApiWith } from "../apiCall.js";
import { API_BASE, API_LOGIN } from "../../constants/apiParams.js";
import { checkIfDeployed } from "../../tools/checkUrl.js";
import { baseRepoUrl } from "../../constants/baseUrl.js";
import { save } from "../../storage/_index.js";

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

    const deployed = checkIfDeployed();
    if (deployed) {
      location.pathname = `/${baseRepoUrl}`;
    }
    if (!deployed) {
      location.pathname = "/";
    }
    return;
  }
  if (response.status === 401) {
    throw new Error("Email and/or password does not match.");
  } else if (response.status === 400 || response.status >= 402) {
    throw new Error("An error occured. Check that your credentials are correct or try again later.");
  }
}
