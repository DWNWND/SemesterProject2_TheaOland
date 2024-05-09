export function userFeedback(message, container) {
  container.classList.add("text-center", "text-grayish-purple", "mt-3");
  container.innerText = message;
}
