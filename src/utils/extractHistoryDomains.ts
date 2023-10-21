import { execPromise } from "./execPromise";

interface ExtractHistoryProps {
  inputFile: string;
}

export const extractHistoryDomains = async ({
  inputFile,
}: ExtractHistoryProps) => {
  return await execPromise(
    `
    sqlite3 ${inputFile} 'select url from urls;' |
        grep -Pio '^(https|http)://(([a-zA-Z](-?[a-zA-Z0-9])*)\.)+[a-zA-Z]{2,}' |
        cut -d '/' -f '3' |
        sort -u |
        shuf | shuf | shuf |
        jq -R | jq -s --compact-output
    `,
    { maxBuffer: 1024 * 1000 * 512 }
  ).then(({ stdout }) => JSON.parse(stdout) as string[]);
};
