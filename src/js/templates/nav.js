// import { logoutFunctionality } from "../events/listners/logout.js";
import { load } from "../storage/load.js";
const pathname = window.location.pathname;
const token = load("token");

export function navTemplate(username) {
  //LOGIN BTN
  const loginLink = document.createElement("a");
  loginLink.setAttribute("href", "/auth/index.html");
  loginLink.classList.add("w-100");
  const loginBtn = document.createElement("button");
  loginBtn.classList.add("btn-local", "btn-height-l", "w-100", "ps-3", "pe-3", "btn-width-l", "btn-white-red", "btn-fontsize-l", "uppercase");
  loginBtn.setAttribute("id", "loginBtnLanding");
  loginBtn.innerText = "Login";
  loginLink.append(loginBtn);

  //USERNAME BTN
  const usernameLink = document.createElement("a");
  usernameLink.setAttribute("href", `/profile/index.html?key=${username}`);
  usernameLink.classList.add("w-100");
  const usernameBtn = document.createElement("button");
  usernameBtn.classList.add("btn-local", "btn-height-l", "ps-3", "pe-3", "w-100", "btn-width-l", "btn-pink", "btn-fontsize-l", "extra-bold", "uppercase");
  usernameBtn.setAttribute("id", "usernameBtn");
  usernameBtn.innerText = username;
  usernameLink.append(usernameBtn);

  //NEW LISTING BTN
  const newlistingLink = document.createElement("a");
  newlistingLink.setAttribute("href", "/edit/index.html");
  newlistingLink.classList.add("w-100");
  const newlistingBtn = document.createElement("button");
  newlistingBtn.classList.add("btn-local", "btn-height-l", "w-100", "btn-width-l", "ps-3", "pe-3", "btn-purple", "btn-fontsize-l", "extra-bold", "uppercase");
  newlistingBtn.setAttribute("id", "newlistingBtn");
  newlistingBtn.innerText = "Add new listing";
  newlistingLink.append(newlistingBtn);

  //HOMEFEED BTN
  const homeLink = document.createElement("a");
  homeLink.setAttribute("href", "/");
  homeLink.classList.add("w-100");
  const homeBtn = document.createElement("button");
  homeBtn.classList.add("btn-local", "btn-height-l", "w-100", "btn-width-l", "ps-3", "pe-3", "btn-orange", "btn-fontsize-l", "extra-bold", "uppercase");
  homeBtn.setAttribute("id", "newlistingBtn");
  homeBtn.innerText = "Home";
  homeLink.append(homeBtn);

  //LOGOUT BTN
  // const logoutLink = document.createElement("a");

  // if (pathname.toLowerCase().includes("/semesterproject2_theaoland/")) {
  //   logoutLink.setAttribute("href", "/SemesterProject2_TheaOland/");
  //   homeLink.setAttribute("href", "/SemesterProject2_TheaOland/");
  // } else {
  //   logoutLink.setAttribute("href", "/");
  //   homeLink.setAttribute("href", "/");
  // }
  // const logoutBtn = document.createElement("button");
  // logoutBtn.classList.add("btn-local", "btn-height-s", "btn-width-xs", "btn-white-black", "btn-fontsize-l", "lowercase");
  // logoutBtn.setAttribute("id", "logoutBtn");
  // logoutBtn.innerText = "log out";
  // logoutLink.append(logoutBtn);

  const nav = document.getElementById("nav");

  if (!token) {
    nav.append(loginLink);
  }
  if (token && (pathname === "/" || pathname.toLowerCase() === "/semesterproject2_theaoland/")) {
    nav.append(newlistingLink, usernameLink);
  }
  if (token && pathname.includes("listing")) {
    nav.append(homeLink, newlistingLink, usernameLink);
  }
  if (token && pathname.includes("profile")) {
    nav.append(homeLink, newlistingLink);
  }
  if (token && pathname.includes("edit")) {
    nav.append(homeLink, usernameLink);
  }
  if (token && pathname.includes("allListings")) {
    nav.append(homeLink, newlistingLink, usernameLink);
  }
}
