import { load } from "../../storage/index.js";

export function logoutFunctionality(btn) {
  btn.addEventListener("mouseup", () => {
    localStorage.clear();
    const token = load("token");
    if (!token) {
      location.pathname = "/";
    }
  });
}
