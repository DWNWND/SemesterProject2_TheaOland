import { load } from "../storage/load.js";
// import "dotenv/config";

const API_KEY = process.env.API_KEY;
// const API_KEY = "d2abe438-b85e-4837-bb83-2678d612f606";

export async function callApiWith(url, options = {}) {
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
