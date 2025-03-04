export const getItem = (key: string) => {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing localStorage item with key "${key}":`, error);
  }
};

export const setItem = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error serializing value for localStorage item with key "${key}":`, error);
  }
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove item from localStorage with key "${key}". Error: ${error}`);
  }
};

export const ls = {
  getItem,
  setItem,
  removeItem,
};
