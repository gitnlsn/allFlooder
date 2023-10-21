import { shuf } from "./shuf";

export const randomContentType = () =>
  shuf([
    '"Content-Type: application/json"',
    '"Content-Type: application/x-www-form-urlencoded"',
  ])[0];
