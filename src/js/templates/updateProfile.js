import { generateBtn } from "./_index.js";
import { generateUpdateProfileFormFields } from "../handlers/events/_index.js";
import { clearUserFeedback } from "../ui/userFeedback/_index.js";
import { saveUpdatedProfile, exitEdit } from "../handlers/listners/_index.js";

/**
 * The function appends the update profile form to the profile container when the update profile btn is clicked.
 *
 * @param {string} btn The btn that triggers the event
 * @param {object} userProfile A object containing the profile data
 * @param {string} container The profile container
 *
 * @uses generateBtn To generate the save and the back buttons
 * @uses generateUpdateProfileFormFields To generate the form fields
 * @uses clearUserFeedback To clear user feedback if present
 * @uses saveUpdatedProfile To save the new information
 * @uses exitEdit To switch away from the update form
 */
export function updateProfileTemplate(btn, userProfile, container) {
  btn.addEventListener("click", () => {
    container.innerHTML = "";
    container.classList.remove("justify-content-around");

    const bioContainer = generateUpdateProfileFormFields("bio", "textarea", "", "bio", userProfile.bio);
    const avatarContainer = generateUpdateProfileFormFields("avatar", "input", "url", "url", userProfile.avatar.url);
    const altContainer = generateUpdateProfileFormFields("alt", "input", "text", "alt", userProfile.avatar.alt);

    const username = document.createElement("h2");
    username.classList.add("heading-2", "text-grayish-purple", "text-center", "mb-4");
    username.innerText = userProfile.name;

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
    fieldInputsContainer.classList.add("w-100");
    fieldInputsContainer.append(username, bioContainer, avatarContainer, altContainer);

    const editProfileForm = document.createElement("form");
    editProfileForm.id = "editProfile";
    editProfileForm.classList.add("d-flex", "flex-column", "w-100", "no-decoration", "align-items-center", "justify-content-center", "gap-2");

    editProfileForm.append(title, fieldInputsContainer, btnContainer, userFeedbackContainer, loaderContainer);
    container.append(editProfileForm);

    exitEdit(backBtn, container, userProfile);
    saveUpdatedProfile(userProfile.name);
    clearUserFeedback(userFeedbackContainer, saveBtn, backBtn, loaderContainer);
  });
}
