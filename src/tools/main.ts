import { consume } from "../utils/consume";
import { copy } from "../utils/copy";
import { curl } from "../utils/curl";
import { extractHistory } from "../utils/extractHistory";
import { makeTemp } from "../utils/mkTemp";
import { rm } from "../utils/rm";
import { setTermination } from "../utils/setTermination";
import { parseValidURL } from "../utils/parseValidURL";

interface MainProps {
  historyPath: string;
  ttl: number;
  threads: number;
}

const main = async ({ historyPath, ttl, threads }: MainProps) => {
  setTermination(ttl);

  const outfile = await makeTemp();

  await copy({ inputPath: historyPath, outputPath: outfile });

  const curlDomains = await extractHistory({
    inputFile: outfile,
  }).then((domains) => parseValidURL(domains));

  await rm({ file: outfile });

  const curlRandomMethodPromise = consume({
    stack: curlDomains,
    runnable: async (domain) => {
      return await Promise.all([
        curl({ url: domain, randomMethod: true, insecure: true, timeout: 1 }),
        curl({ url: domain, randomMethod: true, insecure: true, timeout: 1 }),
        curl({ url: domain, randomMethod: true, insecure: true, timeout: 1 }),
        curl({ url: domain, randomMethod: true, insecure: true, timeout: 1 }),
        curl({ url: domain, randomMethod: true, insecure: true, timeout: 1 }),
      ]);
    },
    threads,
  });

  await Promise.all([curlRandomMethodPromise]);
};

const inputArgs = process.argv.slice(2);
main({
  historyPath: inputArgs[0],
  threads: Number.isFinite(Number(inputArgs[1])) ? Number(inputArgs[1]) : 1,
  ttl: Number.isFinite(Number(inputArgs[2])) ? Number(inputArgs[2]) : 60,
}).catch(console.error);
