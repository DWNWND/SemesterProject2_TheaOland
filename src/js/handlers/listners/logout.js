import { load } from "../../storage/_index.js";
import { removeUrlParameter } from "../../tools/removeUrlParam.js";
import { checkIfDeployed } from "../../tools/checkUrl.js";
import { baseRepoUrl } from "../../constants/baseUrl.js";

export function listenForLogout(btn) {
  btn.addEventListener("click", () => {
    removeUrlParameter("key");
    localStorage.clear();
    removeUrlParameter("key");
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
