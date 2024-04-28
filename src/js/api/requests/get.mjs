import { callApiWith } from "../apiCall.mjs";
import { API_LISTINGS, API_PROFILES } from "../../constants/index.mjs";
import { PARAM_bids } from "../../constants/params.mjs";
import { userFeedback } from "../../ui/components/errors/userFeedback.mjs";

let page = 1;

const errorMessage = "We are having some trouble with our servers, please wait and try again later";
const loadMoreBtn = document.getElementById("loadMore");
const loader = document.getElementById("loader");

export async function getData(url) {
  const errorContainer = document.getElementById("userFeedback");

  const response = await callApiWith(url);
  if (response.ok) {
    const result = await response.json();
    const data = result.data;
    return data;
  } else if (!response.ok) {
    // loader.style.display = "none";
    // loadMoreBtn.style.display = "none";
    // userFeedback(errorMessage, errorContainer);
    throw new Error(`couldn't fetch from api`);
  }
}

export async function get(request, param) {
  let url;
  let result;

  if (!request) {
    throw new Error("the get function is called with a falsy request value");
  }
  if (request === "allListings") {
    url = API_LISTINGS;
    result = await getData(url);
    console.log("this is", request, result);
    return result;
  }
  if (request === "listingsByPage") {
    const pageLimit = 10;
    url = API_LISTINGS + PARAM_bids + `&limit=${pageLimit}&page=${param}`;
    result = await getData(url);
    console.log("this is", request, param, result);
    return result;
  }
  if (request === "listingsBySearch") {
    url = API_LISTINGS + `search?q=${param}`;
    result = await getData(url);
    console.log("this is", request, param, result);
    return result;
  }
  if (request === "listingsByProfile") {
    url = API_PROFILES + `${param}/listings`;
    result = await getData(url);
    console.log("this is", request, param, result);
    return result;
  }
  if (request === "bidsByProfile") {
    url = API_PROFILES + `${param}/bids?_listing`;
    result = await getData(url);
    console.log("this is", request, param, result);
    return result;
  }
  if (request === "winsByProfile") {
    result = await getData(API_PROFILES + `${param}/wins?_listing`);
    console.log("this is", request, param, result);
    return result;
  }
  if (request === "profileBySearch") {
    url = API_PROFILES + `search?q=${param}`;
    result = await getData(url);
    console.log("this is", request, param, result);
    return result;
  }
  if (request === "singleProfile") {
    url = API_PROFILES + `${param}`;
    result = await getData(url);
    console.log("this is", request, param, result);
    return result;
  }
  if (request === "singleListing") {
    url = API_LISTINGS + `${param}`;
    result = await getData(url);
    console.log("this is", request, param, result);
    return result;
  } else {
    throw new Error("the get function is called with a typo");
  }
}
