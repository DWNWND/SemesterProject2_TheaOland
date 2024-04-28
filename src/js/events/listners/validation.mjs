const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const email = document.getElementById("registerEmail");
const emailError = document.getElementById("emailHelpBlock");

const username = document.getElementById("registerUsername");
const usernameError = document.getElementById("usernameHelpBlock");

const password = document.getElementById("registerPassword");
const passwordError = document.getElementById("passwordHelpBlock");

const repeatPassword = document.getElementById("registerRepeatPassword");
const repeatPasswordError = document.getElementById("registerRepeatPasswordError");

const loginPassword = document.getElementById("loginPassword");
const loginEmail = document.getElementById("loginEmail");

export async function validateRepeatPassword(firstPasswordValue, repeatPasswordValue) {
  if (repeatPasswordValue === firstPasswordValue && repeatPasswordValue !== "") {
    repeatPasswordError.innerText = "The passwords match";
    repeatPasswordError.classList.add("success");
    repeatPasswordError.classList.remove("error");
    return firstPasswordValue;
  }
  if (firstPasswordValue === "" || repeatPasswordValue === "") {
    repeatPasswordError.classList.remove("error");
  } else if (repeatPasswordValue !== firstPasswordValue) {
    repeatPasswordError.innerText = "The passwords do not match";
    repeatPasswordError.classList.remove("success");
    repeatPasswordError.classList.add("error");
  }
}
export function validatePassword() {
  if (checkPassword(password.value, 8, 20) === true) {
    passwordError.style.display = "none";
  }
  if (password.value === "") {
    passwordError.style.display = "block";
    passwordError.classList.remove("error");
  } else if (checkPassword(password.value, 8, 20) === false) {
    passwordError.style.display = "block";
    passwordError.classList.add("error");
  }
}
export function validateUsername() {
  if (checkUsername(username.value, 2, 15) === true) {
    usernameError.style.display = "none";
  }
  if (username.value === "") {
    usernameError.style.display = "block";
    usernameError.classList.remove("error");
  } else if (checkUsername(username.value, 2, 15) === false) {
    usernameError.style.display = "block";
    usernameError.classList.add("error");
  }
}
export function validateEmail() {
  if (checkEmail(email.value) === true) {
    emailError.style.display = "none";
  }
  if (email.value === "") {
    emailError.classList.remove("error");
  } else if (checkEmail(email.value) === false) {
    emailError.style.display = "block";
    emailError.classList.add("error");
  }
}
function checkPassword(password, minlen, maxlen) {
  if (password.trim().length > minlen && password.trim().length < maxlen) {
    const regEx = /^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/;
    const patternMatches = regEx.test(password);
    return patternMatches;
  } else {
    return false;
  }
}
function checkUsername(username, minlen, maxlen) {
  if (username.trim().length > minlen && username.trim().length < maxlen) {
    const regEx = /^[a-zA-Z0-9_]*$/;
    const patternMatches = regEx.test(username);
    return patternMatches;
  } else {
    return false;
  }
}
function checkEmail(email) {
  const regEx = /^[a-zA-Z0-9._-]+@(stud\.)?noroff\.no$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

export function validation() {
  email.addEventListener("input", validateEmail);
  username.addEventListener("input", validateUsername);

  password.addEventListener("input", () => {
    validateRepeatPassword(password.value, repeatPassword.value);
    validatePassword();
  });
  repeatPassword.addEventListener("input", () => {
    validateRepeatPassword(password.value, repeatPassword.value);
    validatePassword();
  });

  loginPassword.addEventListener("input", () => {
    if (loginPassword.value === "") {
      // console.log("no password typed in")
      // generalErrorContainer.innerText = "";
    }
  });
  loginEmail.addEventListener("input", () => {
    if (loginPassword.value === "" && loginPassword.value === "") {
      // generalErrorContainer.innerText = "";
    }
  });
}