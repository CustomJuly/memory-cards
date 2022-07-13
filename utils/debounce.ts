export type IDebounce = (fnc: Function, delayMs: number) => void;

export const createDebounce = (): IDebounce => {
  let timeout: any;

  return (fnc: Function, delayMs: number) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fnc();
    }, delayMs);
  };
};
