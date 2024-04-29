import { userFeedback } from "../../ui/components/errors/userFeedback.mjs";
import { register, login } from "../../api/auth/index.mjs";

export async function loginAuth(event) {
  event.preventDefault();

  const email = event.target.loginEmail.value;
  const password = event.target.loginPassword.value;

  await login(email, password);
}

export async function registerAuth(event) {
  event.preventDefault();

  const name = event.target.registerUsername.value;
  const email = event.target.registerEmail.value;
  const firstPassword = event.target.registerPassword.value;
  const passwordRepeat = event.target.registerRepeatPassword.value;
  const errorContainer = document.getElementById("userFeedback");

  if (!name || !email || !firstPassword || !passwordRepeat) {
    errorMessage = "Please fill in all the registration fields.";
    userFeedback(errorMessage, errorContainer);
  } else {
    validatePassword(firstPassword, passwordRepeat);
    if (passwordRepeat === firstPassword) {
      await register(name, email, firstPassword);
    }
  }
}

export function authentication() {
  document.forms.loginForm.addEventListener("submit", loginAuth);
  document.forms.registerForm.addEventListener("submit", registerAuth);
}
