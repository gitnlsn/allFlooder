import { execPromise } from "./execPromise";

interface nslookupProps {
  domain: string;
  server: string;
}

export const nslookup = async ({ domain, server }: nslookupProps) => {
  return await execPromise(`nslookup ${domain} ${server}`)
    .then(({ stdout, stderr }) => ({ stdout, stderr }))
    .catch(({ stdout, stderr }) => ({ stdout, stderr }));
};
