export function load(key) {
  const storageKey = localStorage.getItem(key);

  if (storageKey) {
    return JSON.parse(storageKey);
  }
}
