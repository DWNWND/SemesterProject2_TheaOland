import { authentication } from "../events/listners/auth.js";
import { validation } from "../events/listners/validation.js";
import { clearUserFeedback } from "../ui/components/errors/clearFeedback.js";

const errorContainer = document.getElementById("userFeedback");

export function generateAuth() {
  authentication();
  validation();
  clearUserFeedback(errorContainer);
}
