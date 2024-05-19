/**
 * The function adds user feedback to the DOM
 *
 * @param {string} message The message to be displayed
 * @param {string} container The container the message should be added to
 */
export function userFeedback(message, container) {
  container.classList.add("text-center", "mt-3");
  container.innerText = message;
}
