const TableBody = ({ prepareRow, rows, getTableBodyProps, cellProps }) => {
  return (
    <div {...getTableBodyProps()} className="body">
      {rows.map((row, i) => {
        prepareRow(row);
        return (
          <div {...row.getRowProps()} className="tr">
            {row.cells.map((cell) => {
              return (
                <div
                  {...cell.getCellProps(cellProps)}
                  className={`td ${row.isSelected && 'selected-row'}`}
                >
                  {cell.render('Cell')}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TableBody;
