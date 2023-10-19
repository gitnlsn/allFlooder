import { domainToASCII } from "url";
import { consumer } from "../utils/consumer";
import { copy } from "../utils/copy";
import { curl } from "../utils/curl";
import { extractHistory } from "../utils/extractHistory";
import { makeTemp } from "../utils/mkTemp";
import { ping } from "../utils/ping";
import { rm } from "../utils/rm";
import { setTermination } from "../utils/setTermination";
import { shuf } from "../utils/shuf";
import { traceroute } from "../utils/traceroute";
import { wait } from "../utils/wait";
import { extractHistoryDomains } from "../utils/extractHistoryDomains";

interface MainProps {
  historyPath: string;
  ttl: number;
  delay: number;
}

const main = async ({ historyPath, ttl, delay }: MainProps) => {
  const outfile = await makeTemp();

  await copy({ inputPath: historyPath, outputPath: outfile });

  const { pingDomains, tracerouteDomains } = await extractHistoryDomains({
    inputFile: outfile,
  }).then((domains) => {
    const pingDomains = domains;
    const tracerouteDomains = shuf(pingDomains);

    return {
      pingDomains,
      tracerouteDomains,
    };
  });

  const curlDomains = await extractHistory({
    inputFile: outfile,
  });

  await rm({ file: outfile });

  const curlPromise = consumer(curlDomains, async (domain) => {
    await wait(delay);
    return await curl({ url: domain });
  });

  const pingPromise = consumer(pingDomains, async (domain) => {
    await wait(delay);
    return await ping({ domain });
  });

  const traceroutePromise = consumer(tracerouteDomains, async (domain) => {
    await wait(delay);
    return await traceroute({ domain });
  });

  setTermination(ttl);

  await Promise.all([curlPromise, pingPromise, traceroutePromise]);
};

const inputArgs = process.argv.slice(2);
main({
  historyPath: inputArgs[0],
  ttl: Number.isFinite(Number(inputArgs[2])) ? Number(inputArgs[2]) : 60,
  delay: Number.isFinite(Number(inputArgs[1])) ? Number(inputArgs[1]) : 0.1,
}).catch(console.error);
