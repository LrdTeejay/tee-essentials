// Every read and write is wrapped in try/catch: browsers can block storage.
const stores = () => [window.localStorage, window.sessionStorage];

export function load(key, fallback, area = localStorage) {
  try {
    const raw = area.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value, area = localStorage) {
  try {
    area.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('Could not save', key, err);
  }
}

// Remove a key from both localStorage and sessionStorage
export function remove(key) {
  stores().forEach((area) => {
    try {
      area.removeItem(key);
    } catch {
      /* ignore */
    }
  });
}
