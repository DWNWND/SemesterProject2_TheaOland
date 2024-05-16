export function clearUserFeedback(feedbackContainer, btn) {
  if (document.body.contains(feedbackContainer)) {
    window.addEventListener("click", () => {
      btn.disabled = false;
      feedbackContainer.innerText = "";
    });
  } else {
    return;
  }
}
