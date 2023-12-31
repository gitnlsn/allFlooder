import { execPromise } from "./execPromise";

interface ExtractHistoryProps {
  inputFile: string;
}

export const extractHistory = async ({ inputFile }: ExtractHistoryProps) => {
  return await execPromise(
    `
    sqlite3 ${inputFile} 'select url from urls;' |
        grep -Pi '^(http|https)://(([a-zA-Z](-?[a-zA-Z0-9])*)\.)+[a-zA-Z]{2,}' |
        sort -u |
        shuf | shuf | shuf |
        jq -R | jq -s --compact-output
    `,
    { maxBuffer: 1024 * 1000 * 512 }
  ).then(({ stdout }) => JSON.parse(stdout) as string[]);
};
