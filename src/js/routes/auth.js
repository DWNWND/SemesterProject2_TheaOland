import { listenForAuthentication } from "../events/listners/authenticate.js";
import { formValidation } from "../events/listners/formValidation.js";
import { clearUserFeedback } from "../ui/components/errors/clearFeedback.js";

const errorContainer = document.getElementById("userFeedback");

export function generateAuth() {
  formValidation();
  listenForAuthentication();
  clearUserFeedback(errorContainer);
}
