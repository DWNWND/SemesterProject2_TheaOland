import { listenForLogout } from "../handlers/listners/_index.js";
import { updateProfileTemplate } from "./_index.js";

/**
 * The function appends the profile information to the profile container in the DOM.
 *
 * @param {object} userProfile A object containing the profile data
 *
 * @uses listenForLogout To add a listener to the logout button
 * @uses updateProfileTemplate To switch to the update profile template
 */
export function profileTemplate(userProfile) {
  const profileElement = document.createElement("div");
  profileElement.classList.add("user-profile", "d-flex", "flex-column", "align-items-center", "text-red", "justify-content-between");
  profileElement.id = "profileElement";

  const avatarContainer = document.createElement("div");
  avatarContainer.classList.add("p-4", "d-flex", "justify-content-center");

  const avatar = document.createElement("img");
  avatar.classList.add("img-profile");
  avatar.src = userProfile.avatar.url;
  avatar.alt = userProfile.avatar.alt;

  const username = document.createElement("h1");
  username.classList.add("heading-2", "text-red", "text-center");
  username.innerText = userProfile.name;

  const bio = document.createElement("div");
  bio.classList.add("text-center");
  if (!userProfile.bio) {
    bio.innerText = "";
  }
  if (userProfile.bio) {
    bio.innerText = userProfile.bio;
  }

  const credit = document.createElement("div");
  credit.id = "totalCredit";
  credit.classList.add("heading-1", "text-dark-purple", "text-center", "pt-4", "pb-4");
  credit.innerText = "CREDITS: " + userProfile.credits;

  const logoutBtn = document.createElement("button");
  logoutBtn.classList.add("d-flex", "btn-pink", "align-items-center", "w-100", "justify-content-center", "btn-local", "btn-height-s", "text-lowercase");
  logoutBtn.id = "logoutBtn";
  logoutBtn.innerText = "log out";
  listenForLogout(logoutBtn);

  const editProfileBtn = document.createElement("p");
  editProfileBtn.classList.add("text-lowercase", "text-decoration-underline", "text-dark-red", "pointer");
  editProfileBtn.id = "editProfileBtn";
  editProfileBtn.innerText = "edit profile";
  updateProfileTemplate(editProfileBtn, userProfile, profileElement);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("d-flex", "flex-column", "w-100", "align-items-center", "justify-content-center", "gap-2");
  btnContainer.append(editProfileBtn, logoutBtn);

  const details = document.createElement("div");

  avatarContainer.append(avatar);
  details.append(username, bio, credit);
  profileElement.append(avatarContainer, details, btnContainer);

  const profileContainer = document.getElementById("profileContainer");
  profileContainer.append(profileElement);
}
