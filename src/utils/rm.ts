import { execPromise } from "./execPromise";

interface RmProps {
  file: string;
}

export const rm = async ({ file }: RmProps) => {
  return await execPromise(`rm ${file}`);
};
