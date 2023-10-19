import { execPromise } from "./execPromise";

interface ExtractHistoryProps {
  inputFile: string;
}

export const extractHistory = async ({ inputFile }: ExtractHistoryProps) => {
  return await execPromise(`
    sqlite3 ${inputFile} 'select url from urls;' |
        jq -R | jq -s --compact-output
    `).then(({ stdout }) => JSON.parse(stdout) as string[]);
};
