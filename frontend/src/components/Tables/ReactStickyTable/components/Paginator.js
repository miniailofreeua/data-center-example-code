const Paginator = ({
  canPreviousPage,
  canNextPage,
  nextPage,
  previousPage,
  setPageSize,
  pageSize,
  sizePerPageList,
  pageIndex,
}) => {
  return (
    <div className="paginator-container">
      <ul className="pagination">
        <li
          className={`page-item ${!canPreviousPage && 'disabled'} `}
          onClick={() => previousPage()}
        >
          <span className="page-link paginator-button" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </span>
        </li>
        <li className="page-item">
          <span className="page-link paginator-button">{pageIndex + 1}</span>
        </li>
        <li
          className={`page-item ${!canNextPage && 'disabled'}`}
          onClick={() => nextPage()}
        >
          <span
            className="page-link paginator-button paginator-button"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </span>
        </li>
      </ul>

      <select
        id="pageDropdown"
        className="btn btn-secondary dropdown-toggle paginator-button"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {sizePerPageList.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Paginator;
