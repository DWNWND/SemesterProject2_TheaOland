/**
 * This funciton is inspired by: https://stackoverflow.com/questions/10970078/modifying-a-query-string-without-reloading-the-page
 * The function takes the current url and deletes the searchParam from the url based on the passed in paramKey, then updates the url.
 *
 * @param {string} paramKey The searchParam key
 */
export function removeUrlParameter(paramKey) {
  const url = window.location.href;
  var currentUrl = new URL(url);
  currentUrl.searchParams.delete(paramKey);
  const newUrl = currentUrl.href;
  window.history.pushState({ path: newUrl }, "", newUrl);
}
