export type IDebounce = (fnc: Function) => void;

export const createDebounceStart = (thresholdMs: number): IDebounce => {
  let lastRunTimestamp: number = 0;

  return (fnc: Function) => {
    const range = (new Date()).getTime() - lastRunTimestamp
    if (range > thresholdMs) {
      fnc()
    }
    lastRunTimestamp = new Date().getTime()
  };
};
