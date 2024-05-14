import { profileTemplate } from "../../templates/_index.js";

export function navigateBack(container, updatedProfile) {
  try {
    // const uxElementSecondary = document.getElementById("uxElementSecondary");
    // uxElementSecondary.innerHTML = "";
    container.remove();
    profileTemplate(updatedProfile);
  } catch (error) {
    console.log(error);
  }
}
