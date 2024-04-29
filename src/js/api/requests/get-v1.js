// import { callApiWith } from "../apiCall.mjs";
// import { API_BASE, API_AUCTION, API_LISTINGS, API_SEARCH, API_PROFILES, API_BIDS, PARAM_associatedListing, loader, loadMoreBtn } from "../../constants/index.mjs";
// import { userFeedback } from "../../ui/components/errors/userFeedback.js";
// import { load } from "../../storage/load.js";

// let page = 1;
// const pageLimit = 10;

// export const listingsByPage = getListingsByPage(page);
// export const allListings = getAllListings();

// export async function getAllListings() {
//   const errorContainer = document.querySelector("");
//   const token = load("token");

//   if (token) {
//     const url = API_BASE + API_AUCTION + API_LISTINGS;
//     const response = await callApiWith(url);

//     if (response.ok) {
//       const allListings = await response.json().data;
//       // const allListings = listings.data;
//       return allListings;
//     } else if (!response.ok) {
//       loader.style.display = "none";
//       loadMoreBtn.style.display = "none";

//       const errorMessage = "We are having some trouble with our servers, please wait and try again later";
//       userFeedback(errorMessage, errorContainer);

//       throw new Error("couldn't fetch listings from api");
//     }
//   }
// }

// export async function getListingsByPage(page) {
//   const errorContainer = document.querySelector("");
//   const token = load("token");

//   if (token) {
//     const url = API_BASE + API_AUCTION + API_LISTINGS + `?=${pageLimit}&page=${page}`;
//     const response = await callApiWith(url);
//     if (response.ok) {
//       const allListings = await response.json().data;
//       // const allListings = listings.data;
//       return allListings;
//     } else if (!response.ok) {
//       loader.style.display = "none";
//       loadMoreBtn.style.display = "none";

//       const errorMessage = "We are having some trouble with our servers, please wait and try again later";
//       userFeedback(errorMessage, errorContainer);

//       throw new Error("couldn't fetch listings from api");
//     }
//   }
// }

// export async function getListingsBySearch(query) {
//   const errorContainer = document.querySelector("");
//   const token = load("token");

//   if (token) {
//     const url = API_BASE + API_AUCTION + API_LISTINGS + API_SEARCH + `?q=${query}`;
//     const response = await callApiWith(url);
//     if (response.ok) {
//       const allListings = await response.json().data;
//       // const allListings = listings.data;
//       return allListings;
//     } else if (!response.ok) {
//       loader.style.display = "none";
//       loadMoreBtn.style.display = "none";

//       const errorMessage = "We are having some trouble with our servers, please wait and try again later";
//       userFeedback(errorMessage, errorContainer);

//       throw new Error("couldn't fetch listings from api");
//     }
//   }
// }

// export async function getListingsByProfile(username) {
//   const errorContainer = document.querySelector("");
//   const token = load("token");

//   if (token) {
//     const url = API_BASE + API_AUCTION + API_PROFILES + `/${username}` + API_LISTINGS;
//     const response = await callApiWith(url);
//     if (response.ok) {
//       const allListings = await response.json().data;
//       // const allListings = listings.data;
//       return allListings;
//     } else if (!response.ok) {
//       loader.style.display = "none";
//       loadMoreBtn.style.display = "none";

//       const errorMessage = "We are having some trouble with our servers, please wait and try again later";
//       userFeedback(errorMessage, errorContainer);

//       throw new Error("couldn't fetch listings from api");
//     }
//   }
// }

// export async function getBidsByProfile(username) {
//   const errorContainer = document.querySelector("");
//   const token = load("token");

//   if (token) {
//     const url = API_BASE + API_AUCTION + API_PROFILES + `/${username}` + API_BIDS + PARAM_associatedListing;
//     const response = await callApiWith(url);
//     if (response.ok) {
//       const allBids = await response.json().data;
//       // const allListings = listings.data;
//       return allBids;
//     } else if (!response.ok) {
//       loader.style.display = "none";
//       loadMoreBtn.style.display = "none";

//       const errorMessage = "We are having some trouble with our servers, please wait and try again later";
//       userFeedback(errorMessage, errorContainer);

//       throw new Error("couldn't fetch listings from api");
//     }
//   }
// }

// export async function getWinsByProfile(username) {
//   const errorContainer = document.querySelector("");
//   const token = load("token");

//   if (token) {
//     const url = API_BASE + API_AUCTION + API_PROFILES + `/${username}` + API_WINS + PARAM_associatedListing;
//     const response = await callApiWith(url);
//     if (response.ok) {
//       const allWins = await response.json().data;
//       // const allListings = listings.data;
//       return allWins;
//     } else if (!response.ok) {
//       loader.style.display = "none";
//       loadMoreBtn.style.display = "none";

//       const errorMessage = "We are having some trouble with our servers, please wait and try again later";
//       userFeedback(errorMessage, errorContainer);

//       throw new Error("couldn't fetch listings from api");
//     }
//   }
// }

// export async function getProfilesBySearch(query) {
//   const errorContainer = document.querySelector("");
//   const token = load("token");

//   if (token) {
//     const url = API_BASE + API_AUCTION + API_PROFILES + API_SEARCH + `?q=${query}`;
//     const response = await callApiWith(url);
//     if (response.ok) {
//       const allProfiles = await response.json().data;
//       // const allListings = listings.data;
//       return allProfiles;
//     } else if (!response.ok) {
//       loader.style.display = "none";
//       loadMoreBtn.style.display = "none";

//       const errorMessage = "We are having some trouble with our servers, please wait and try again later";
//       userFeedback(errorMessage, errorContainer);

//       throw new Error("couldn't fetch listings from api");
//     }
//   }
// }

// export async function getSingleProfile(username) {
//   if (!id) {
//     throw new Error("getSingleListing funciton is missing a listingID");
//   }
//   const url = API_BASE + API_AUCTION + API_PROFILES + `/${username}`;
//   const response = await callApiWith(url);
//   if (response.ok) {
//     const user = await response.json().data;
//     // const singlePost = post.data;
//     return user;
//   }
// }

// export async function getSingleListing(id, getParam) {
//   if (!id) {
//     throw new Error("getSingleListing funciton is missing a listingID");
//   }
//   const url = API_BASE + API_AUCTION + API_LISTINGS + `/${id}?${getParam}`;
//   const response = await callApiWith(url);
//   if (response.ok) {
//     const listing = await response.json().data;
//     // const singlePost = post.data;
//     return listing;
//   }
// }
