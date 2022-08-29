export const isBrandApiDataValid = ({ id, domain, apiUrl, runEverySeconds }) =>
  !id && domain && apiUrl && runEverySeconds;
