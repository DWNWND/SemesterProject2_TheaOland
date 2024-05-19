import { load } from "../../storage/_index.js";
import { checkIfDeployed, removeUrlParameter } from "../../tools/_index.js";
import { baseRepoUrl } from "../../constants/baseUrl.js";

/**
 * The function listens for a log out, removes the url param, clears the local storage and sends the user to the landing page.
 *
 * @param {string} btn The logout button that triggers the event
 *
 * @uses removeUrlParameter To remove the current url param
 * @uses load To check if the token was removed from local storage
 * @uses checkIfDeployed To check if the function is running on the deployment or locally
 */

export function listenForLogout(btn) {
  btn.addEventListener("click", () => {
    removeUrlParameter("key");
    localStorage.clear();
    const token = load("token");

    const deployed = checkIfDeployed();
    if (!token && deployed) {
      location.pathname = `/${baseRepoUrl}`;
    }
    if (!token && !deployed) {
      location.pathname = "/";
    }
    if (token) {
      throw new Error("Logout unsuccessful");
    }
  });
}
