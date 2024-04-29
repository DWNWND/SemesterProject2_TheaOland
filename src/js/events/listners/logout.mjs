import { load } from "../../storage/index.mjs";

export function logoutFunctionality(btn) {
  btn.addEventListener("mouseup", () => {
    localStorage.clear();
    const token = load("token");
    if (!token) {
      location.pathname = "/";
    }
  });
}
