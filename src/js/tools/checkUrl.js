import { baseRepoUrl } from "../constants/baseUrl.js";

export function checkIfDeployed() {
  const currentPath = window.location.pathname;
  if (currentPath.toLowerCase().includes(baseRepoUrl.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}
