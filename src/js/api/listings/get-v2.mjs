import { callApiWith } from "../apiCall.mjs";
import { API_LISTINGS, API_PROFILES, loader } from "../../constants/index.mjs";
import { userFeedback } from "../../ui/components/errors/userFeedback.mjs";

let page = 1;

const errorMessage = "We are having some trouble with our servers, please wait and try again later";

export async function get(url) {
  // const errorContainer = document.querySelector("");

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

export async function getAllListings() {
  const listings = await get(API_LISTINGS);
  return listings;
}

export async function getListingsByPage(page) {
  const pageLimit = 10;
  const listings = await get(API_LISTINGS + `?=${pageLimit}&page=${page}`);
  return listings;
}

export async function getListingsBySearch(query) {
  const listings = await get(API_LISTINGS + `search?q=${query}`);
  return listings;
}

export async function getListingsByProfile(username) {
  const listings = await get(API_PROFILES + `${username}/listings`);
  return listings;
}

export async function getBidsByProfile(username) {
  const bids = await get(API_PROFILES + `${username}/bids?_listing`);
  return bids;
}

export async function getWinsByProfile(username) {
  const wins = await get(API_PROFILES + `${username}/wins?_listing`);
  return wins;
}

export async function getProfilesBySearch(query) {
  const profiles = await get(API_PROFILES + `search?q=${query}`);
  return profiles;
}

export async function getSingleProfile(username) {
  const profiles = await get(API_PROFILES + `${username}`);
  return profiles;
}

export async function getSingleListing(id) {
  const listing = await get(API_LISTINGS + `${id}`);
  return listing;
}