import { register, login } from "../../api/auth/index.js";
import { validateInput, validateRepeatPassword } from "./formValidation.js";
import { userFeedback } from "../../ui/components/errors/userFeedback.js";

let errorMessage;
const errorContainer = document.getElementById("userFeedback");

export async function loginAuth(event) {
  event.preventDefault();
  const email = event.target.loginEmail.value;
  const password = event.target.loginPassword.value;

  if (email && password) {
    await login(email, password);
  } else if (!email || !password) {
    errorMessage = "Please fill in both email and password to log in.";
    userFeedback(errorMessage, errorContainer);
    throw new Error("Please fill in both email and password to log in.");
  }
}

export async function registerAuth(event) {
  event.preventDefault();

  const username = event.target.registerUsername.value;
  const email = event.target.registerEmail.value;
  const firstPassword = event.target.registerPassword.value;
  const passwordRepeat = event.target.registerRepeatPassword.value;

  const validEmail = validateInput("email", "emailHelpBlock", email);
  const validUsername = validateInput("username", "usernameHelpBlock", username, 2, 15);
  const validPassword = validateInput("password", "passwordHelpBlock", firstPassword, 8, 20);
  const validRepeatPassword = validateRepeatPassword(firstPassword, passwordRepeat);

  if (username && email && firstPassword && passwordRepeat && validEmail && validUsername && validPassword && validRepeatPassword) {
    await register(username, email, firstPassword);
  } else if (!username || !email || !firstPassword || !passwordRepeat || !validEmail || !validUsername || !validPassword || !validRepeatPassword) {
    errorMessage = "Please fill in all the registration fields according to registration criteria.";
    userFeedback(errorMessage, errorContainer);
    throw new Error("Please fill in all the registration fields according to registration criteria.");
  }
}

export function listenForAuthentication() {
  document.forms.loginForm.addEventListener("submit", loginAuth);
  document.forms.registerForm.addEventListener("submit", registerAuth);
}
