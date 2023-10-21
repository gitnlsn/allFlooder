import { Stream } from "stream";
import { execPromise } from "./execPromise";

interface PingProps {
  domain: string;
}

export const ping = async ({ domain }: PingProps) => {
  return await execPromise(`ping ${domain} -n -c 3`)
    .then(({ stdout, stderr }) => ({ stdout, stderr }))
    .catch(({ stdout, stderr }) => ({ stdout, stderr }));
};
