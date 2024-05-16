import { load } from "../../storage/_index.js";

export function listenForLogout(btn) {
  btn.addEventListener("click", () => {
    localStorage.clear();
    const token = load("token");

    if (!token) {
      location.pathname = "./";
    }
  });
}
