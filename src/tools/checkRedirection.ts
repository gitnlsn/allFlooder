import { copy } from "../utils/copy";
import { extractHistoryDomains } from "../utils/extractHistoryDomains";
import { makeTemp } from "../utils/mkTemp";
import { rm } from "../utils/rm";
import { consume } from "../utils/consume";
import { setTermination } from "../utils/setTermination";
import { testDomain } from "../utils/testDomain";

interface MainProps {
  historyPath: string;
  ttl: number;
  threads: number;
}

const main = async ({ historyPath, ttl, threads }: MainProps) => {
  setTermination(ttl);

  const outfile = await makeTemp();

  await copy({ inputPath: historyPath, outputPath: outfile });

  const allDomains = await extractHistoryDomains({
    inputFile: outfile,
  }).then((domains) =>
    domains
      .filter((domain) => !domain.includes("localhost"))
      .filter((domain) => domain.split(".").length >= 2)
  );

  await rm({ file: outfile });

  const checkRedirectionPromises = consume({
    stack: allDomains,
    runnable: async (domain) => {
      const result = await testDomain(domain);
      if (result.status === "error") {
        console.log(result);
      }
    },
    threads,
  });

  await Promise.all([...checkRedirectionPromises]);
};

const inputArgs = process.argv.slice(2);

main({
  historyPath: inputArgs[0],
  threads: Number.isFinite(Number(inputArgs[1])) ? Number(inputArgs[1]) : 1,
  ttl: Number.isFinite(Number(inputArgs[2])) ? Number(inputArgs[2]) : 60,
}).catch(console.error);
