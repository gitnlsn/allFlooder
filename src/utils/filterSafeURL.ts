export const filterSafeURL = (urlList: string[]): string[] =>
  urlList.filter((url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.warn(`Filtering invalid url: ${url}`);
      return false;
    }
  });
