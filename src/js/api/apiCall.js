import { load } from "../storage/load.js";
import { API_KEY } from "../../../test.js";

export async function callApiWith(url, options = {}) {
  console.log(API_KEY);

  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
}

function headers(hasBody = false) {
  const headers = new Headers();
  const token = load("token");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }
  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }
  return headers;
}
