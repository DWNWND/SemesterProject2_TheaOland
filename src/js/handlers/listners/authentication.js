import { register, login } from "../../api/auth/_index.js";
import { validateInput, validateRepeatPassword } from "../events/_index.js";
import { clearUserFeedback, userFeedback } from "../../ui/userFeedback/_index.js";

const feedbackContainer = document.getElementById("feedbackContainer");
const loaderContainer = document.getElementById("loaderContainer");

/**
 * The function listens for an event to execute the login and register functions.
 */
export function listenForAuthentication() {
  document.forms.loginForm.addEventListener("submit", loginAuth);
  document.forms.registerForm.addEventListener("submit", registerAuth);
}

/**
 * The function takes the informmation from the login form and sends it to the server.
 * @uses login To send the login information to the server
 * @uses userFeedback To display user feedback if something is wrong when logging in
 * @uses clearUserFeedback To clear the user feedback again
 */
export async function loginAuth(event) {
  event.preventDefault();

  const email = event.target.loginEmail.value;
  const password = event.target.loginPassword.value;
  const loginBtn = document.getElementById("loginSubmitBtn");

  try {
    if (email && password) {
      loaderContainer.style.display = "block";
      loginBtn.disabled = true;
      await login(email, password);
      loaderContainer.style.display = "none";
    } else if (!email || !password) {
      throw new Error("Please fill in both email and password to log in.");
    }
  } catch (error) {
    userFeedback(error, feedbackContainer);
    clearUserFeedback(feedbackContainer, loginBtn);
    loaderContainer.style.display = "none";
  }
}

/**
 * The function takes the informmation from the register form and sends it to the server.
 * @uses validateInput to check if the information in the inputs follow the criteria
 * @uses register To send the register information to the server
 * @uses userFeedback To display user feedback if something is wrong when logging in
 * @uses clearUserFeedback To clear the user feedback again
 */
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

  const registerBtn = document.getElementById("registerSubmitBtn");

  try {
    if (username && email && firstPassword && passwordRepeat && validEmail && validUsername && validPassword && validRepeatPassword) {
      loaderContainer.style.display = "block";
      registerBtn.disabled = true;
      await register(username, email, firstPassword);
      loaderContainer.style.display = "none";
    } else if (!username || !email || !firstPassword || !passwordRepeat || !validEmail || !validUsername || !validPassword || !validRepeatPassword) {
      throw new Error("Please fill in all the registration fields according to registration criteria.");
    }
  } catch (error) {
    userFeedback(error, feedbackContainer);
    clearUserFeedback(feedbackContainer, registerBtn);
    loaderContainer.style.display = "none";
  }
}
