export function clearUserFeedback(feedbackContainer, btn1, btn2, loader) {
  if (document.body.contains(feedbackContainer)) {
    window.addEventListener("click", () => {
      btn1.disabled = false;
      btn2.disabled = false;
      feedbackContainer.innerText = "";
      loader.style.display = "none";
    });
  } else {
    return;
  }
}
