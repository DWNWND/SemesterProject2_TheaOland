/**
 * The function checks if a key is saved in local storage
 * @param {string} key The key to check for
 */
export function load(key) {
  const storageKey = localStorage.getItem(key);

  if (storageKey) {
    return JSON.parse(storageKey);
  }
}
