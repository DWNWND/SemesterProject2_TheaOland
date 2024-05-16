import { profileTemplate } from "../../templates/_index.js";

export function navigateBack(container, updatedProfile) {
  try {
    container.remove();
    profileTemplate(updatedProfile);
  } catch (error) {
    console.log(error);
  }
}
