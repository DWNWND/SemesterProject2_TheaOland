/**
 * The function saves a key/value pair to local storage
 *
 * @param {string} key The key
 * @param {string} value The value
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
