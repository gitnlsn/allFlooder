import { execPromise } from "./execPromise";
import { randomContentType } from "./randomContentType";
import { randomCurlMethod } from "./randomCurlMethod";

interface CurlProps {
  url: string;
  randomMethod?: boolean;
}

export const curl = async ({ url, randomMethod = false }: CurlProps) => {
  return await execPromise(`
    curl '${url}' -sS \
        -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
        -H 'accept-language: en' \
        -H 'cache-control: max-age=0' \
        -H 'sec-ch-ua: "Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'sec-ch-ua-platform: "Linux"' \
        -H 'sec-fetch-dest: document' \
        -H 'sec-fetch-mode: navigate' \
        -H 'sec-fetch-site: same-origin' \
        -H 'sec-fetch-user: ?1' \
        -H 'upgrade-insecure-requests: 1' \
        -H 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36' \
        --compressed --location --insecure --max-redirs 1000 \
        ${randomMethod ? `-X ${randomCurlMethod()}` : ""} \
        ${randomMethod ? `-H ${randomContentType()}` : ""} \
        >/dev/null
    `);
};
