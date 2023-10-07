import { execPromise } from "./execPromise";

interface CopyProps {
  inputPath: string;
  outputPath: string;
}

export const copy = async ({ inputPath, outputPath }: CopyProps) => {
  return await execPromise(`cp ${inputPath} ${outputPath}`);
};
