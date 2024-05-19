import { validateInput, validateRepeatPassword } from "../events/formValidation.js";

/**
 * The function listens for validation on the given inputs and feeds validation criteria to the validateInput function.
 *
 * @uses validateInput Checks the validation criteria
 * @uses validateRepeatPassword Checks if the two passwords match
 */
export function listenForValidation() {
  const email = document.getElementById("registerEmail");
  const username = document.getElementById("registerUsername");
  const password = document.getElementById("registerPassword");
  const repeatPassword = document.getElementById("registerRepeatPassword");

  let minLen;
  let maxLen;

  email.addEventListener("input", () => {
    validateInput("email", "emailHelpBlock", email.value);
  });

  username.addEventListener("input", () => {
    minLen = 2;
    maxLen = 15;
    validateInput("username", "usernameHelpBlock", username.value, minLen, maxLen);
  });

  password.addEventListener("input", () => {
    minLen = 8;
    maxLen = 20;
    validateInput("password", "passwordHelpBlock", password.value, minLen, maxLen);
    validateRepeatPassword(password.value, repeatPassword.value);
  });

  repeatPassword.addEventListener("input", () => {
    validateRepeatPassword(password.value, repeatPassword.value);
  });
}
