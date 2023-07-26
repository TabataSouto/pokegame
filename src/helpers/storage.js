export const setPlayer = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getPlayer = (key) => JSON.parse(localStorage.getItem(key));

export const removePlayer = (key) => localStorage.removeItem(key);
