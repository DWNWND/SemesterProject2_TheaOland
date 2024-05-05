// import { callApiWith } from "../apiCall.mjs";
// import { API_LISTINGS, API_PROFILES, loader } from "../../constants/index.mjs";
// import { userFeedback } from "../../ui/components/errors/userFeedback.js";

// let page = 1;

// const errorMessage = "We are having some trouble with our servers, please wait and try again later";

// export async function getData(url) {
//   // const errorContainer = document.querySelector("");

//   const response = await callApiWith(url);
//   if (response.ok) {
//     const result = await response.json();
//     const data = result.data;
//     return data;
//   } else if (!response.ok) {
//     // loader.style.display = "none";
//     // loadMoreBtn.style.display = "none";
//     // userFeedback(errorMessage, errorContainer);
//     throw new Error(`couldn't fetch from api`);
//   }
// }

// export async function get(request, param) {
//   let url = "";

//   if (!request) {
//     console.log("the get request is called with falsy values");
//     throw new Error("the get funciton is called with falsy values");
//   }
//   if (request === "allListings") {
//     url = API_LISTINGS;
//     const listings = await getData(url);
//     console.log("this is all listings:", listings);
//     return listings;
//   }
//   if (request.toLowerCase().includes("listingsbypage")) {
//     const pageLimit = 10;
//     url = API_LISTINGS + `?limit=${pageLimit}&page=${param}`;
//     const listings = await getData(url);
//     console.log("this is listings by page, page:", param, listings);
//     return listings;
//   }
//   if (request === "listingsBySearch") {
//     url = API_LISTINGS + `search?q=${param}`;
//     const listings = await getData(url);
//     console.log("this is listings by search, search query:", param, listings);
//     return listings;
//   }
//   if (request === "listingsByProfile") {
//     url = API_PROFILES + `${param}/listings`;
//     const listings = await getData(url);
//     console.log("this is listings by profile, profile:", param, listings);
//     return listings;
//   }
//   if (request === "bidsByProfile") {
//     url = API_PROFILES + `${param}/bids?_listing`;
//     const bids = await getData(url);
//     console.log("this is bids by profile, profile:", param, bids);
//     return bids;
//   }
//   if (request === "winsByProfile") {
//     const wins = await getData(API_PROFILES + `${param}/wins?_listing`);
//     console.log("this is wins by profile, profile:", param, wins);
//     return wins;
//   }
//   if (request === "profileBySearch") {
//     url = API_PROFILES + `search?q=${param}`;
//     const profiles = await getData(url);
//     console.log("this is profile by search, search query:", param, profiles);
//     return profiles;
//   }
//   if (request === "singleProfile") {
//     url = API_PROFILES + `${param}`;
//     const profiles = await getData(url);
//     console.log("this is single profile, profile:", param, profiles);
//     return profiles;
//   }
//   if (request === "singleListing") {
//     url = API_LISTINGS + `${param}`;
//     const listing = await getData(url);
//     console.log("this is single listing, listing:", param, listing);
//     return listing;
//   }
// }
