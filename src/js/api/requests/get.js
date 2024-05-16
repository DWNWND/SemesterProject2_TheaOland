import { callApiWith } from "../apiCall.js";
import { API_LISTINGS, API_PROFILES } from "../../constants/apiParams.js";

export let totalPages = 0;
export let currentPage = 0;
const navPages = document.getElementById("navPages");

export async function getData(url) {
  const response = await callApiWith(url);
  if (response.ok) {
    const result = await response.json();
    totalPages = result.meta.pageCount;
    currentPage = result.meta.currentPage;
    const data = result.data;
    return data;
  } else if (!response.ok) {
    navPages.style.display = "none";
    throw new Error("couldn't fetch from api");
  }
}

export async function get(request, param, sparam = "") {
  let url;
  let result;

  if (!request) {
    throw new Error("the get function is called with a falsy request value");
  }
  // if (request === "allListings") {
  //   result = await getData(API_LISTINGS);
  //   return result;
  // }
  if (request === "listingsByPage") {
    const pageLimit = 10;
    result = await getData(API_LISTINGS + `?_bids=true&limit=${pageLimit}&page=${param}&sort=endsAt&sortOrder=asc&_active=true`);
    return result;
  }
  if (request === "listingsBySearch") {
    const pageLimit = 10;
    result = await getData(API_LISTINGS + `search?q=${sparam}&_bids=true&limit=${pageLimit}&page=${param}`);
    return result;
  }
  if (request === "listingsByProfile") {
    if (sparam !== "") {
      const pageLimit = 10;
      result = await getData(API_PROFILES + `${sparam}/listings?_bids=true&limit=${pageLimit}&page=${param}&sort=endsAt&sortOrder=asc`);
      return result;
    } else if (sparam === "") {
      const pageLimit = 6;
      result = await getData(API_PROFILES + `${param}/listings?_bids=true&limit=${pageLimit}&page=1&sort=endsAt&sortOrder=asc`);
      return result;
    }
  }
  if (request === "bidsByProfile") {
    result = await getData(API_PROFILES + `${param}/bids?_listings=true`);
    return result;
  }
  if (request === "winsByProfile") {
    result = await getData(API_PROFILES + `${param}/wins?_listing&_bids=true`);
    return result;
  }
  // if (request === "profileBySearch") {
  //   url = API_PROFILES + `search?q=${param}`;
  //   result = await getData(url);
  //   console.log(request, "- username: ", param, result);
  //   return result;
  // }
  if (request === "singleProfile") {
    url = API_PROFILES + `${param}`;
    result = await getData(url);
    return result;
  }
  if (request === "singleListing") {
    url = API_LISTINGS + `${param}?_bids=true&_seller=true`;
    result = await getData(url);
    return result;
  } else {
    throw new Error("the get function is called with a typo");
  }
}
