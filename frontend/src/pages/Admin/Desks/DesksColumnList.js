import { faEdit } from '@fortawesome/free-solid-svg-icons';
import TableMoreBtn from '../../../components/TableMoreBtn';
import { hashing } from '../../../services/hash';
import { historyPush } from '../../../services/push';

const DesksColumnList = [
  {
    text: 'Id',
    dataField: 'id',
    show: true,
  },
  {
    text: 'Name',
    dataField: 'name',
    show: true,
  },
  {
    text: 'Brand',
    dataField: 'brand.name',
    show: true,
  },
  {
    text: 'Actions',
    dataField: 'brandId',
    formatter: (cellContent, brand) => (
      <TableMoreBtn
        actions={[
          {
            onClick: () => historyPush(`desks/edit/?id=${hashing(brand.id)}`),
            icon: faEdit,
            text: 'Edit',
          },
        ]}
      />
    ),
    show: true,
  },
].filter(({ show }) => show);

export default DesksColumnList;
