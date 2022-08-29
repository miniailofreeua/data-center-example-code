import { Card, CardTitle, Row } from 'reactstrap';

const ChartContainer = ({ children, title }) => {
  return (
    <Row>
      <Card>
        <CardTitle className="w-100 text-center my-3">{title}</CardTitle>

        <Row>{children}</Row>
      </Card>
    </Row>
  );
};

export default ChartContainer;
