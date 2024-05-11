import { load } from "../../storage/_index.js";

export function listenForLogout(btn) {
  btn.addEventListener("click", () => {
    localStorage.clear();
    const token = load("token");
    const pathname = window.location.pathname;

    if (!token && pathname.toLowerCase().includes("/semesterproject2_theaoland/")) {
      location.href = "/SemesterProject2_TheaOland/";
    } else if (!token) {
      location.href = "/";
    }
  });
}
