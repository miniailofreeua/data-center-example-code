import path from 'path';

type QueryParamT = {
  key: string;
  value: string;
};

export const concatUrl = (paths: string[], queryParams: QueryParamT[]) => {
  if (paths.length === 0) {
    return null;
  }
  const crmUrl = path.join(...paths);
  const url = new URL(crmUrl);
  queryParams.forEach((q) => url.searchParams.append(q.key, q.value));
  const urlWithParams = url.toString();
  return urlWithParams;
};
