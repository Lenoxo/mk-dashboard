const now = new Date();
const currentDate = now.toLocaleDateString();

const asyncLocalStorage = {
  setItem(key: string, value: object): Promise<string> {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve("Data saved");
    });
  },

  getItem(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      const item = localStorage.getItem(key);
      resolve(item);
    });
  },
};

export { currentDate, asyncLocalStorage };
