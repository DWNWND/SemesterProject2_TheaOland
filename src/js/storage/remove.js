/**
 * The function removes a key/value pair from local storage based on its key
 * @param {string} key The key of the key/value pair to be removed
 */
export function remove(key) {
  localStorage.removeItem(key);
}
