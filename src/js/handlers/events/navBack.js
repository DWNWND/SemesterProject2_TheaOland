import { profileTemplate } from "../../templates/_index.js";

/**
 * The function removes the profile update form and replaces it with the profile container with the updated profile information.
 *
 * @param {Object[]} updatedProfile The updated profile information
 * @param {string} container The HTML container to remove
 *
 * @uses profileTemplate To generate a HTML element for the profile view.
 */
export function navigateBack(container, updatedProfile) {
  try {
    container.remove();
    profileTemplate(updatedProfile);
  } catch (error) {
    console.log(error);
  }
}
