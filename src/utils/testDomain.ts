import { curl } from "./curl";
import { nslookup } from "./nslookup";
import { ping } from "./ping";
import { traceroute } from "./traceroute";

export const testDomain = async (domain: string) =>
  curl({
    url: domain,
    timeout: 10,
    insecure: false,
  }).then(async ({ stderr }) => {
    if (stderr.length === 0) {
      return {
        status: "ok",
        domain: "",
        pingResult: "",
        tracerouteResult: "",
        cloudFlareNslookupResult: "",
        googleNslookupResult: "",
        retryCurlResult: "",
      };
    }

    const retryCurlPromise = curl({
      url: domain,
      timeout: 1,
    })
      .then(() =>
        curl({
          url: domain,
          timeout: 1,
        })
      )
      .then(() =>
        curl({
          url: domain,
          timeout: 1,
        })
      )
      .then(({ stderr }) => stderr);

    const pingPromise = ping({
      domain,
    }).then(({ stdout }) => stdout);
    const traceroutePromise = traceroute({
      domain,
    }).then(({ stdout }) => stdout);
    const cloudflareNslookupPromise = nslookup({
      domain,
      server: "1.1.1.1",
    }).then(({ stdout }) => stdout);
    const googleNslookupPromise = nslookup({
      domain,
      server: "8.8.8.8",
    }).then(({ stdout }) => stdout);

    const [
      pingResult,
      tracerouteResult,
      cloudFlareNslookupResult,
      googleNslookupResult,
      retryCurlResult,
    ] = await Promise.all([
      pingPromise,
      traceroutePromise,
      cloudflareNslookupPromise,
      googleNslookupPromise,
      retryCurlPromise,
    ]);

    return {
      status: "error",
      domain,
      pingResult,
      tracerouteResult,
      cloudFlareNslookupResult,
      googleNslookupResult,
      retryCurlResult,
    };
  });
