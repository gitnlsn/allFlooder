import { shuf } from "./shuf";

export const randomCurlMethod = () => shuf(["POST", "PUT", "PATCH", "DELETE"])[0];
