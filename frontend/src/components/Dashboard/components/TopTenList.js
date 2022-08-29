import { Card, CardBody, Col, Table } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const TopTenList = ({ data }) => {
  const TopTenListColumn = ({ name, totalEuro }, idx) => (
    <tr key={idx}>
      <td>
        <h6 className="font-size-15 mb-1 fw-normal">
          <i className="uil-user-circle" style={{ marginRight: '5px' }} />
          {name}
        </h6>
      </td>
      <td>
        {/* <span className="badge bg-soft-danger font-size-12">{status}</span> */}
      </td>
      <td />
      <td />
      <td />
      <td
        className="text-muted fw-semibold text-start"
        style={{ width: 'fit-content' }}
      >
        {totalEuro} €
      </td>
    </tr>
  );
  return (
    <Col lg={6}>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4 text-center">Team Leads</h4>
          <SimpleBar style={{ maxHeight: '336px' }}>
            <div className="table-responsive">
              <Table className="table-borderless table-centered table-nowrap">
                <tbody>
                  <tr>
                    <td>
                      <h6 className="font-size-15 mb-1 fw-normal">Team Lead</h6>
                    </td>
                    <td>
                      {/* <span className="badge bg-soft-danger font-size-12">{status}</span> */}
                    </td>
                    <td />
                    <td />
                    <td />
                    <td className="text-muted fw-semibold text-start">
                      Total Euro
                    </td>
                  </tr>
                  {data.map(({ name, totalEuro }, idx) => (
                    <TopTenListColumn
                      name={name}
                      totalEuro={totalEuro}
                      idx={idx}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          </SimpleBar>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TopTenList;
