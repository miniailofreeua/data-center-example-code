export function fetchRequest({
  fetchData,
  fetchForColumnHeader,
  tableFilters,
  dispatch,
  take,
  skip,
  url,
}) {
  const baseParams = {
    take,
    skip,
    ...(url && { url }),
  };

  if (fetchData) {
    dispatch(
      fetchData(
        tableFilters ? Object.assign(baseParams, tableFilters) : baseParams,
      ),
    );
  }

  if (fetchForColumnHeader) {
    dispatch(fetchForColumnHeader(tableFilters || {}));
  }
}
