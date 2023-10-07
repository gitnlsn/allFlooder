import { execPromise } from "./execPromise";

interface TracerouteProps {
  domain: string;
}

export const traceroute = async ({ domain }: TracerouteProps) => {
  return await execPromise(`traceroute -n -m 8 ${domain}`);
};
