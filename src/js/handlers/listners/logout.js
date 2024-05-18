import { load } from "../../storage/_index.js";
import { removeUrlParameter } from "../../deployment/removeUrlParam.js";

export function listenForLogout(btn) {
  btn.addEventListener("click", () => {
    removeUrlParameter("key");
    localStorage.clear();
    removeUrlParameter("key");
    const token = load("token");

    if (!token) {
      location.pathname = "../";
    }
  });
}
