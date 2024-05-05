export function clearUserFeedback(feedbackContainer) {
  if (document.body.contains(feedbackContainer)) {
    window.addEventListener("click", () => {
      feedbackContainer.innerText = "";
    });
  } else {
    return;
  }
}
