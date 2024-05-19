/**
 * The function clears user feedback from the DOM if there is any displayed and a user clicks somewhere on the page.
 *
 * @param {string} feedbackContainer The container that should be cleared
 * @param {string} btn1 If there is one button passed into the function, able it
 * @param {string} btn2 If there is two buttons passed into the function, able it
 * @param {string} loader If there is a loader passed into the function, clear it
 */
export function clearUserFeedback(feedbackContainer, btn1, btn2, loader) {
  if (document.body.contains(feedbackContainer)) {
    window.addEventListener("click", () => {
      feedbackContainer.innerText = "";
      if (btn1) {
        btn1.disabled = false;
      }
      if (btn2) {
        btn2.disabled = false;
      }
      if (loader) {
        loader.style.display = "none";
      }
    });
  } else {
    return;
  }
}
