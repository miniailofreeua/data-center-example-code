import './BasicTable.scss';

const BasicTable = ({ header, rows }) => (
  <table className="table basic-table">
    <thead>
      <tr>
        {header.map((el, i) => (
          <td key={i}>{el}</td>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          {row.map((value, i) => (
            <td key={i} title={value}>
              {value}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default BasicTable;
