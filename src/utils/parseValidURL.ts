export const parseValidURL = (urlList: string[]): string[] =>
  urlList
    .map((url) => {
      try {
        if (url.includes("http")) {
          return new URL(url).href;
        }

        return new URL(`https://${url}`).href;
      } catch (error) {
        console.warn(`Invalid url: ${url}`);
        return undefined;
      }
    })
    .filter((url) => {
      if (url === undefined) {
        return false;
      }

      if (url.includes("localhost")) {
        return false;
      }

      return true;
    }) as string[];
