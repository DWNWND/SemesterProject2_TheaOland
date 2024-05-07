import { callApiWith } from "../apiCall.js";
import { API_LISTINGS, API_PROFILES } from "../../constants/index.js";

export let totalPages = 0;
export let currentPage = 0;
const navPages = document.getElementById("navPages");
const loader = document.getElementById("loader");

export async function getData(url) {
  const response = await callApiWith(url);
  if (response.ok) {
    const result = await response.json();
    totalPages = result.meta.pageCount;
    currentPage = result.meta.currentPage;
    const data = result.data;
    return data;
  } else if (!response.ok) {
    loader.style.display = "none";
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
  if (request === "allListings") {
    url = API_LISTINGS;
    result = await getData(url);
    console.log(request, "- ", result);
    return result;
  }
  if (request === "listingsByPage") {
    const pageLimit = 10;
    url = API_LISTINGS + `?_bids=true&limit=${pageLimit}&page=${param}`;
    result = await getData(url);
    console.log(request, "- page: ", param, result);
    return result;
  }
  if (request === "listingsBySearch") {
    const pageLimit = 10;
    url = API_LISTINGS + `search?q=${sparam}&_bids=true&limit=${pageLimit}&page=${param}`;
    result = await getData(url);
    console.log(request, "- searchParam: ", sparam, "page: ", param, result);
    return result;
  }
  if (request === "listingsByProfile") {
    url = API_PROFILES + `${param}/listings`;
    result = await getData(url);
    console.log(request, "- username: ", param, result);
    return result;
  }
  if (request === "bidsByProfile") {
    url = API_PROFILES + `${param}/bids?_listing`;
    result = await getData(url);
    console.log(request, "- username: ", param, result);
    return result;
  }
  if (request === "winsByProfile") {
    result = await getData(API_PROFILES + `${param}/wins?_listing`);
    console.log(request, "- username: ", param, result);
    return result;
  }
  if (request === "profileBySearch") {
    url = API_PROFILES + `search?q=${param}`;
    result = await getData(url);
    console.log(request, "- username: ", param, result);
    return result;
  }
  if (request === "singleProfile") {
    url = API_PROFILES + `${param}`;
    result = await getData(url);
    console.log(request, "- username: ", param, result);
    return result;
  }
  if (request === "singleListing") {
    url = API_LISTINGS + `${param}`;
    result = await getData(url);
    console.log(request, "- listing-id: ", param, result);
    return result;
  } else {
    throw new Error("the get function is called with a typo");
  }
}
