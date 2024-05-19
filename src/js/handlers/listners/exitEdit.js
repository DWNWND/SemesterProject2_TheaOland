import { navigateBack } from "../events/_index.js";

/**
 * The function listens for a "back" event, where a user don't want to update their profile, and want to exit the update profile view.
 *
 * @param {string} btn The btn that triggers the event
 * @param {object} userProfile A object containing the profile data
 * @param {string} container The profile container
 *
 * @uses navigateBack To remove the update element and replace it with the profile element
 */
export function exitEdit(btn, container, userProfile) {
  btn.addEventListener("click", () => {
    navigateBack(container, userProfile);
  });
}
