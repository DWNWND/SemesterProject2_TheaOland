import { load } from "../../storage/_index.js";
import { removeUrlParameter } from "../../deployment/removeUrlParam.js";

export function listenForLogout(btn) {
  btn.addEventListener("click", () => {
    removeUrlParameter("key");
    localStorage.clear();
    const token = load("token");

    if (!token) {
      location.pathname = "./";
    }
  });
}
