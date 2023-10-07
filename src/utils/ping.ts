import { execPromise } from "./execPromise";

interface PingProps {
  domain: string;
}

export const ping = async ({ domain }: PingProps) => {
  return await execPromise(`ping ${domain} -n -c 3`);
};
