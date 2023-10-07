import { execPromise } from "./execPromise";

export const makeTemp = async () => {
  return await execPromise('mktemp -ut "XXXXXXXXX"').then(({ stdout }) =>
    stdout.replace("\n", "")
  );
};
