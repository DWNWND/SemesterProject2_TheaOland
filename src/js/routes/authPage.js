import { listenForAuthentication, listenForValidation } from "../handlers/listners/_index.js";
import { clearUserFeedback } from "../ui/userFeedback/_index.js";

const errorContainer = document.getElementById("userFeedback");

export function generateAuth() {
  listenForValidation();
  listenForAuthentication();
  clearUserFeedback(errorContainer);
}
