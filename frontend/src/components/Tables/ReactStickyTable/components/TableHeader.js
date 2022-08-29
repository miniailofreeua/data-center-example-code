const TableHeader = ({ headerGroups, headerProps }) => {
  return (
    <div className="header">
      {headerGroups.map((headerGroup) => (
        <div {...headerGroup.getHeaderGroupProps()} className="tr">
          {headerGroup.headers.map((column) => (
            <div {...column.getHeaderProps(headerProps)} className="th">
              {column.render('Header')}
              {column.canResize && (
                <div
                  {...column.getResizerProps()}
                  className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
