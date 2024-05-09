import { logoutFunctionality } from "../events/listners/logout.js";
import { updateProfile } from "../api/requests/update.js";

const uxElementSecondary = document.getElementById("uxElementSecondary");

export function profileTemplate(userProfile) {
  const profileElement = document.createElement("div");
  profileElement.classList.add("user-profile", "vh-75", "d-flex", "flex-column", "align-items-center", "text-red", "justify-content-between");
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
  logoutBtn.classList.add("d-flex", "align-items-center", "w-100", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-fontsize-l", "lowercase");
  logoutBtn.id = "logoutBtn";
  logoutBtn.innerText = "log out";
  logoutFunctionality(logoutBtn);

  const editProfileBtn = document.createElement("button");
  editProfileBtn.classList.add("lowercase", "d-flex", "w-100", "align-items-center", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-orange", "btn-fontsize-l");
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
  uxElementSecondary.innerHTML = "";

  profileContainer.append(profileElement);
}

function generateFormField(id, element, type, name, data) {
  const fieldContainer = document.createElement("div");
  fieldContainer.classList.add("form-floating", "mb-3", "w-100");

  const input = document.createElement(element);
  input.id = id;
  input.setAttribute("name", name);
  input.classList.add("form-control");
  input.required;
  input.value = data;

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.classList.add("edit-profile-form-labels", "uppercase", "semi-bold", "text-grayish-purple");
  label.innerText = id;

  if (name !== "bio") {
    input.type = type;
  }
  if (name !== "alt") {
    label.innerText = id;
  }
  if (name === "alt") {
    label.innerText = "image description";
  }
  if (name === "name") {
    const usernameHelpBlock = document.createElement("div");
    usernameHelpBlock.id = "usernameHelpBlock";
    usernameHelpBlock.classList.add("form-text", "mb-3");
    usernameHelpBlock.innerText = "The username must not contain punctuation symbols apart from underscore (_).";
    fieldContainer.append(input, label, usernameHelpBlock);
  } else {
    fieldContainer.append(input, label);
  }
  return fieldContainer;
}

function updateProfileTemplate(btn, profile, container) {
  btn.addEventListener("click", () => {
    container.innerHTML = "";
    container.classList.remove("justify-content-around");

    const usernameContainer = generateFormField("username", "input", "text", "name", profile.name);
    const bioContainer = generateFormField("bio", "textarea", "", "bio", profile.bio);
    const avatarContainer = generateFormField("avatar", "input", "url", "url", profile.avatar.url);
    const altContainer = generateFormField("alt", "input", "text", "alt", profile.avatar.alt);

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("d-flex", "w-100", "align-items-center", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-orange", "btn-fontsize-l", "lowercase");
    saveBtn.id = "saveBtn";
    saveBtn.innerText = "save";
    saveBtn.setAttribute("type", "submit");

    const backBtn = document.createElement("a");
    backBtn.classList.add("d-flex", "w-100", "no-decoration", "align-items-center", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-purple", "btn-fontsize-l", "lowercase");
    backBtn.id = "backBtn";
    backBtn.innerText = "back";

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("d-flex", "w-100", "flex-column", "align-items-center", "justify-content-center", "gap-2");
    btnContainer.append(saveBtn, backBtn);

    const userFeedbackContainer = document.createElement("div");
    userFeedbackContainer.id = "userFeedbackContainer";
    userFeedbackContainer.classList.add("text-center", "text-grayish-purple");

    const title = document.createElement("h1");
    title.classList.add("heading-1", "text-red", "pb-4", "pt-4");
    title.innerText = "update profile";

    const editProfileForm = document.createElement("form");
    editProfileForm.id = "editProfile";
    editProfileForm.classList.add("d-flex", "flex-column", "gap-2");

    editProfileForm.append(title, usernameContainer, bioContainer, avatarContainer, altContainer, btnContainer, userFeedbackContainer);
    container.append(editProfileForm);

    exitEdit(backBtn, container);
    saveUpdatedProfile();
  });
}

export function saveUpdatedProfile() {
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
}

export function navigateBack(container, updatedProfile) {
  try {
    uxElementSecondary.innerHTML = "";
    container.remove();
    profileTemplate(updatedProfile);
  } catch (error) {
    console.log(error);
  }
}

function exitEdit(btn, container) {
  btn.addEventListener("click", () => {
    navigateBack(container);
  });
}
