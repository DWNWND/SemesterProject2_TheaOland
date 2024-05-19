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
