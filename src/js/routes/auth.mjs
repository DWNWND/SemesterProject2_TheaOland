import { authentication } from "../events/listners/auth.mjs";
import { validation } from "../events/listners/validation.mjs";
import { clearUserFeedback } from "../ui/components/errors/clearFeedback.mjs";

const errorContainer = document.getElementById("userFeedback");

export function generateAuth() {
  authentication();
  validation();
  clearUserFeedback(errorContainer);
}
