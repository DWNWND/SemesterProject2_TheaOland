import { load } from "../../storage/_index.js";
import { removeUrlParameter } from "../../tools/removeUrlParam.js";

export function listenForLogout(btn) {
  btn.addEventListener("click", () => {
    localStorage.clear();
    removeUrlParameter("key");
    const token = load("token");

    if (!token) {
      location.pathname = "../";
    }
  });
}
