import { updateProfile } from "../../api/requests/update.js";

/**
 * The function makes a object of the information from the update profile form and passes it to the updateProfile function(the PUT request)
 *
 * @param {string} username The username of the profile thats being updated
 * @uses updateProfile Sends the new object to the server
 */
export function saveUpdatedProfile(username) {
  const loaderContainer = document.getElementById("loaderContainer");
  document.forms.editProfile.addEventListener("submit", (event) => {
    loaderContainer.style.display = "block";
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);
    const updatedProfile = Object.fromEntries(formData.entries());

    const profile = {
      name: username,
      bio: updatedProfile.bio,
      avatar: {
        url: updatedProfile.url,
        alt: updatedProfile.alt,
      },
    };
    updateProfile(profile);
  });
}
