import { generateBtn } from "../../templates/_index.js";
import { generateUpdateProfileFormFields, navigateBack } from "../events/_index.js";
import { updateProfile } from "../../api/requests/update.js";

export function updateProfileTemplate(btn, userProfile, container) {
  btn.addEventListener("click", () => {
    container.innerHTML = "";
    container.classList.remove("justify-content-around");

    const usernameContainer = generateUpdateProfileFormFields("username", "input", "text", "name", userProfile.name);
    const bioContainer = generateUpdateProfileFormFields("bio", "textarea", "", "bio", userProfile.bio);
    const avatarContainer = generateUpdateProfileFormFields("avatar", "input", "url", "url", userProfile.avatar.url);
    const altContainer = generateUpdateProfileFormFields("alt", "input", "text", "alt", userProfile.avatar.alt);

    const saveBtn = generateBtn("saveBtn", "save");
    const backBtn = generateBtn("backBtn", "back");

    const btnContainer = document.createElement("div");
    btnContainer.id = "btnContainer";
    btnContainer.classList.add("d-flex", "w-100", "flex-column", "align-items-center", "justify-content-center", "gap-2", "pt-6");
    btnContainer.append(saveBtn, backBtn);

    const loaderContainer = document.createElement("div");
    loaderContainer.id = "loaderContainer";
    loaderContainer.classList.add("p-5");
    loaderContainer.innerHTML = `<span id="loader" class="loader"><span class="visually-hidden">Loading...</span></span>`;

    const userFeedbackContainer = document.createElement("div");
    userFeedbackContainer.id = "userFeedbackContainer";
    userFeedbackContainer.classList.add("text-center");

    const title = document.createElement("h1");
    title.classList.add("heading-1", "text-red", "text-center", "pb-4", "pt-4");
    title.innerText = "update profile";

    const fieldInputsContainer = document.createElement("div");
    fieldInputsContainer.id = "fieldsInputContainer";
    fieldInputsContainer.append(usernameContainer, bioContainer, avatarContainer, altContainer);

    const editProfileForm = document.createElement("form");
    editProfileForm.id = "editProfile";
    editProfileForm.classList.add("d-flex", "flex-column", "w-100", "no-decoration", "align-items-center", "justify-content-center", "gap-2");

    editProfileForm.append(title, fieldInputsContainer, btnContainer, userFeedbackContainer, loaderContainer);
    container.append(editProfileForm);

    exitEdit(backBtn, container, userProfile);
    saveUpdatedProfile();
  });
}

function saveUpdatedProfile() {
  const loaderContainer = document.getElementById("loaderContainer");
  document.forms.editProfile.addEventListener("submit", (event) => {
    loaderContainer.style.display = "block";
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

function exitEdit(btn, container, userProfile) {
  btn.addEventListener("click", () => {
    navigateBack(container, userProfile);
  });
}
