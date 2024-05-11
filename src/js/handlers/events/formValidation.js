export async function validateRepeatPassword(firstPasswordValue, repeatPasswordValue) {
  const repeatPasswordError = document.getElementById("registerRepeatPasswordError");
  if (repeatPasswordValue === firstPasswordValue && repeatPasswordValue !== "") {
    repeatPasswordError.innerText = "The passwords match";
    repeatPasswordError.classList.add("success");
    repeatPasswordError.classList.remove("error");
    repeatPasswordError.style.display = "block";
    return firstPasswordValue;
  }
  if (repeatPasswordValue !== firstPasswordValue) {
    repeatPasswordError.innerText = "The passwords do not match";
    repeatPasswordError.classList.remove("success");
    repeatPasswordError.classList.add("error");
    repeatPasswordError.style.display = "block";
    return false;
  }
  if (repeatPasswordValue === "") {
    repeatPasswordError.classList.remove("error");
    repeatPasswordError.style.display = "none";
    return false;
  }
}

export function validateInput(inputType, helpBlock, inputValue, minlen = "", maxlen = "") {
  helpBlock = document.getElementById(helpBlock);
  const regExTestResult = testRegex(inputType, inputValue, minlen, maxlen);

  if (regExTestResult === true) {
    helpBlock.style.display = "none";
    return true;
  }
  if (regExTestResult === false && inputValue !== "") {
    helpBlock.style.display = "block";
    helpBlock.classList.add("error");
    return false;
  }
  if (inputValue === "") {
    helpBlock.style.display = "block";
    helpBlock.classList.remove("error");
    return false;
  }
}

function testRegex(inputType, inputValue, minlen = "", maxlen = "") {
  if (inputType === "password") {
    if (inputValue.trim().length > minlen && inputValue.trim().length < maxlen) {
      const regEx = /^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/;
      const patternMatches = regEx.test(inputValue);
      return patternMatches;
    }
  }
  if (inputType === "username") {
    if (inputValue.trim().length > minlen && inputValue.trim().length < maxlen) {
      const regEx = /^[a-zA-Z0-9_]*$/;
      const patternMatches = regEx.test(inputValue);
      return patternMatches;
    }
  }
  if (inputType === "email") {
    const regEx = /^[a-zA-Z0-9._-]+@(stud\.)?noroff\.no$/;
    const patternMatches = regEx.test(inputValue);
    return patternMatches;
  } else {
    return false;
  }
}
