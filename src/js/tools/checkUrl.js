import { baseRepoUrl } from "../constants/baseUrl.js";

/**
 * The function checks if the JS is running on the deployed site or locally.
 * It returns true if its run on the deployed site and false if its run locally.
 * The function is an answer to the path-issues with github pages, so that the code can be run both on the deployed site and locally without changing it.
 */
export function checkIfDeployed() {
  const currentPath = window.location.pathname;
  if (currentPath.toLowerCase().includes(baseRepoUrl.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}
