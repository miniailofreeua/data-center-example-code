import {
  faCloudDownloadAlt,
  faFileImport,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import TableMoreBtn from '../../../components/TableMoreBtn';
import { hashing } from '../../../services/hash';
import { historyPush } from '../../../services/push';

const BrandsColumnList = [
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
    text: 'User Details URL',
    dataField: 'userDetailsUrl',
    show: true,
  },
  {
    text: 'Brand Url',
    dataField: 'brandUrl',
    show: true,
  },

  {
    text: 'Actions',
    dataField: 'brandId',
    formatter: (cellContent, brand) => (
      <TableMoreBtn
        actions={[
          {
            onClick: () => historyPush(`brands/edit/?id=${hashing(brand.id)}`),
            icon: faEdit,
            text: 'Edit',
          },
          {
            onClick: () =>
              historyPush(`brands/edit/?id=${hashing(brand.id)}&tab=1`),
            icon: faFileImport,
            text: 'Add Update Api',
          },
          {
            onClick: () =>
              historyPush(`brands/edit/?id=${hashing(brand.id)}&tab=2`),
            icon: faCloudDownloadAlt,
            text: 'Add Pull Api',
          },
        ]}
      />
    ),
    show: true,
  },
].filter(({ show }) => show);

export default BrandsColumnList;
