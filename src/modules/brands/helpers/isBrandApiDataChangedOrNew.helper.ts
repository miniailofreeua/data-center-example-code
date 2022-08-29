export const isBrandApiDataChangedOrNew = (
  { id, domain, apiUrl, runEverySeconds },
  brandApiDB,
) => {
  if (!id) {
    return true;
  }
  return (
    domain !== brandApiDB.domain ||
    apiUrl !== brandApiDB.apiUrl ||
    runEverySeconds !== brandApiDB.runEverySeconds
  );
};
