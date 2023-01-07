import type { timestampType } from "./indexType";

const setParams = <T extends timestampType>(params: T): T => {
  params.timestamp = new Date().getTime();
  return params;
};
export { setParams };
