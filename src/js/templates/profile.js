import { listingTemplate } from "./listings.js";
import { load } from "../storage/load.js";
import { logoutFunctionality } from "../events/listners/logout.js";
import { updateProfile } from "../api/requests/update.js";
import { userFeedback } from "../ui/components/errors/userFeedback.js";

const uxElement = document.getElementById("uxElement");

const token = load("token");

export function profileTemplate(userProfile) {
  const profileElement = document.createElement("div");
  profileElement.classList.add("user-profile", "vh-75", "d-flex", "flex-column", "align-items-center", "text-red", "glassmorphism", "justify-content-between");
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
  credit.classList.add("heading-1", "text-dark-purple", "text-center", "pt-4", "pb-4");
  credit.innerText = "CREDITS: " + userProfile.credits;

  const logoutBtn = document.createElement("button");
  logoutBtn.classList.add("d-flex", "align-items-center", "w-100", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-purple", "btn-fontsize-l", "lowercase");
  logoutBtn.id = "logoutBtn";
  logoutBtn.innerText = "log out";
  logoutFunctionality(logoutBtn);

  const editProfileBtn = document.createElement("button");
  editProfileBtn.classList.add("d-flex", "w-100", "align-items-center", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-pink", "btn-fontsize-l", "lowercase");
  editProfileBtn.id = "logoutBtn";
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

export function renderProfileListings(listingsArray, container) {
  if (listingsArray.length === 0 || !listingsArray) {
    uxElement.innerHTML = "";
    throw new Error("You have not posted any listings yet.");
  } else {
    container.innerHTML = "";
    for (let i = 0; i < listingsArray.length; i++) {
      container.append(listingTemplate(listingsArray[i], token));
    }
    const allListings = document.createElement("a");
    allListings.innerText = "all listings";
    allListings.setAttribute("href", "/allListings/index.html");
    allListings.classList.add("text-red", "text-center");

    container.append(allListings);
    uxElement.innerHTML = "";
  }
}

function updateProfileTemplate(btn, profile, container) {
  btn.addEventListener("click", () => {
    container.innerHTML = "";
    container.classList.remove("justify-content-around");

    const title = document.createElement("h1");
    title.classList.add("heading-1", "text-red", "pb-4", "pt-4");
    title.innerText = "update profile";

    const editProfileForm = document.createElement("form");
    editProfileForm.id = "editProfile";
    editProfileForm.classList.add("d-flex", "flex-column", "gap-2");

    const usernameContainer = document.createElement("div");
    usernameContainer.classList.add("form-floating", "w-100");

    const usernameInput = document.createElement("input");
    usernameInput.id = "updateUsername";
    usernameInput.classList.add("form-control");
    usernameInput.required;
    usernameInput.setAttribute("name", "name");
    usernameInput.value = profile.name;

    const usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for", "updateUsername");
    usernameLabel.classList.add("edit-profile-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
    usernameLabel.innerText = "username";

    const usernameHelpBlock = document.createElement("div");
    usernameHelpBlock.id = "usernameHelpBlock";
    usernameHelpBlock.classList.add("form-text", "mb-3");
    usernameHelpBlock.innerText = "The username must not contain punctuation symbols apart from underscore (_).";

    usernameContainer.append(usernameInput, usernameLabel, usernameHelpBlock);

    const bioContainer = document.createElement("div");
    bioContainer.classList.add("form-floating", "mb-3", "w-100");

    const bioInput = document.createElement("textarea");
    bioInput.id = "bio";
    // bioInput.type = "text";
    bioInput.setAttribute("name", "bio");
    bioInput.classList.add("form-control");
    bioInput.required;
    bioInput.value = profile.bio;

    const bioLabel = document.createElement("label");
    bioLabel.setAttribute("for", "bio");
    bioLabel.classList.add("edit-profile-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
    bioLabel.innerText = "bio";

    bioContainer.append(bioInput, bioLabel);

    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("form-floating", "mb-3", "w-100");

    const avatarInput = document.createElement("input");
    avatarInput.id = "avatar";
    avatarInput.setAttribute("name", "url");
    avatarInput.type = "url";
    avatarInput.classList.add("form-control", "mb-3");
    avatarInput.required;
    avatarInput.value = profile.avatar.url;

    const avatarLabel = document.createElement("label");
    avatarLabel.setAttribute("for", "avatar");
    avatarLabel.classList.add("edit-profile-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
    avatarLabel.innerText = "avatar";

    avatarContainer.append(avatarInput, avatarLabel);

    const altContainer = document.createElement("div");
    altContainer.classList.add("form-floating", "mb-3", "w-100");

    const altInput = document.createElement("input");
    altInput.id = "alt";
    altInput.setAttribute("name", "alt");
    altInput.type = "text";
    altInput.classList.add("form-control", "mb-3");
    altInput.required;
    altInput.value = profile.avatar.alt;

    const altLabel = document.createElement("label");
    altLabel.setAttribute("for", "alt");
    altLabel.classList.add("edit-profile-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
    altLabel.innerText = "image description";

    altContainer.append(altInput, altLabel);

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("d-flex", "w-100", "align-items-center", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-purple", "btn-fontsize-l", "lowercase");
    saveBtn.id = "saveBtn";
    saveBtn.innerText = "save";
    saveBtn.setAttribute("type", "submit");
    // saveBtn.type = "submit";

    const backBtn = document.createElement("a");
    backBtn.classList.add("d-flex", "w-100", "no-decoration", "align-items-center", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-pink", "btn-fontsize-l", "lowercase");
    backBtn.id = "backBtn";
    backBtn.innerText = "back";

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("d-flex", "w-100", "flex-column", "align-items-center", "justify-content-center", "gap-2");
    btnContainer.append(saveBtn, backBtn);

    editProfileForm.append(title, usernameContainer, bioContainer, avatarContainer, altContainer, btnContainer);
    container.append(editProfileForm);

    exitEdit(backBtn, container);
    saveUpdatedProfile();
  });
}

export function saveUpdatedProfile() {
  try {
    document.forms.editProfile.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const updatedProfile = Object.fromEntries(formData.entries());

      const profile = {
        name: updatedProfile.name,
        bio: updatedProfile.bio,
        avatar: {
          url: updatedProfile.url,
          alt: updatedProfile.alt,
        },
      };

      updateProfile(profile);
    });
  } catch (error) {
    const userFeedbackContainer = document.getElementById("userFeedback");
    userFeedback(error, userFeedbackContainer);
    console.log(error);
  }
}

export function back(container) {
  try {
    const userProfile = load("profile");
    container.remove();
    profileTemplate(userProfile);
  } catch (error) {
    console.log(error);
  }
}

function exitEdit(btn, container) {
  btn.addEventListener("click", () => {
    // const userFeedbackContainer = document.getElementById("userFeedback");
    // userFeedback(error, userFeedbackContainer);
    back(container);
  });
}
