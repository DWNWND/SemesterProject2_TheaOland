import { load } from "../storage/load.js";
import { checkIfDeployed } from "../deployment/checkUrl.js";
import { baseRepoUrl } from "../constants/baseUrl.js";
const token = load("token");

export function navTemplate(username) {
  //LOGIN BTN
  const loginLink = document.createElement("a");
  loginLink.classList.add("w-100");
  const loginBtn = document.createElement("button");
  loginBtn.classList.add("btn-local", "btn-height-l", "w-100", "ps-3", "pe-3", "btn-width-l", "btn-white-red", "btn-fontsize-l", "uppercase");
  loginBtn.setAttribute("id", "loginBtnLanding");
  loginBtn.innerText = "Login";
  loginLink.append(loginBtn);

  //USERNAME BTN
  const usernameLink = document.createElement("a");
  usernameLink.classList.add("w-100");
  const usernameBtn = document.createElement("button");
  usernameBtn.classList.add("btn-local", "btn-height-l", "ps-3", "pe-3", "w-100", "btn-width-l", "btn-pink", "btn-fontsize-l", "extra-bold", "uppercase");
  usernameBtn.setAttribute("id", "usernameBtn");
  usernameBtn.innerText = username;
  usernameLink.append(usernameBtn);

  //NEW LISTING BTN
  const newlistingLink = document.createElement("a");
  newlistingLink.classList.add("w-100");
  const newlistingBtn = document.createElement("button");
  newlistingBtn.classList.add("btn-local", "btn-height-l", "w-100", "btn-width-l", "ps-3", "pe-3", "btn-purple", "btn-fontsize-l", "extra-bold", "uppercase");
  newlistingBtn.setAttribute("id", "newlistingBtn");
  newlistingBtn.innerText = "Add new listing";
  newlistingLink.append(newlistingBtn);

  //HOMEFEED BTN
  const homeLink = document.createElement("a");
  homeLink.classList.add("w-100");
  const homeBtn = document.createElement("button");
  homeBtn.classList.add("btn-local", "btn-height-l", "w-100", "btn-width-l", "ps-3", "pe-3", "btn-orange", "btn-fontsize-l", "extra-bold", "uppercase");
  homeBtn.setAttribute("id", "homeBtn");
  homeBtn.innerText = "Home";
  homeLink.append(homeBtn);

  const nav = document.getElementById("nav");

  const deployed = checkIfDeployed();
  console.log(deployed);
  if (deployed) {
    loginLink.setAttribute("href", `auth/index.html`);
    usernameLink.setAttribute("href", `profile/index.html?key=${username}`);
    newlistingLink.setAttribute("href", `edit/index.html`);
    homeLink.setAttribute("href", `/${baseRepoUrl}`);

    const pathname = window.location.pathname;
    if (pathname.includes("profile") || pathname.includes("allListings") || pathname.includes("listing") || pathname.includes("edit")) {
      usernameLink.setAttribute("href", `../profile/index.html?key=${username}`);
      newlistingLink.setAttribute("href", `../edit/index.html`);
      homeLink.setAttribute("href", `/${baseRepoUrl}`);
    }
  }
  if (!deployed) {
    loginLink.setAttribute("href", `/auth/index.html`);
    usernameLink.setAttribute("href", `/profile/index.html?key=${username}`);
    newlistingLink.setAttribute("href", `/edit/index.html`);
    homeLink.setAttribute("href", `/`);
  }
  if (!token) {
    nav.append(loginLink);
  }
  if (token) {
    nav.append(homeLink, newlistingLink, usernameLink);
  }
}
