export const filterSafeURL = (urlList: string[]): string[] =>
  urlList.filter((url) => {
    if (url.includes("localhost")) {
      return false;
    }

    try {
      new URL(url);
      return true;
    } catch (error) {
      console.warn(`Filtering invalid url: ${url}`);
      return false;
    }
  });
