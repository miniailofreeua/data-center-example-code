export function getParams(prop: string): string | null {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(prop);
}
