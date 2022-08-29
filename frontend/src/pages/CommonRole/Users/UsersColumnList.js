import { UserRole, UserRoleLabel } from '../../../enums/UserRole.enum';
import { getDesksLabel } from '../../../helpers/getDesksLabel';
import { hashing } from '../../../services/hash';
import { historyPush } from '../../../services/push';

const userRole = localStorage.getItem('userRole');

const UsersColumnList = [
  {
    Header: 'Id',
    accessor: 'id',
    show: true,
    maxWidth: 35,
    minWidth: 35,
  },
  {
    Header: 'Username',
    accessor: 'username',
    show: true,
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: ({ value: role }) => <>{UserRoleLabel[role]}</>,
    show: true,
  },
  {
    Header: 'Desk(s)',
    accessor: 'desk',
    Cell: ({ row }) => <>{getDesksLabel(row?.original)}</>,
    show: true,
  },
  {
    Header: 'Brand(s)',
    accessor: 'userBrands',
    Cell: ({ value: userBrands, row: { original } }) => {
      const userDesks = original.userDesks;
      if (userBrands.length) {
        return userBrands.map(({ brand }) => brand.name);
      }

      if (userDesks.length) {
        const uniqueBrands = [
          ...new Set(userDesks?.map(({ desk: { brand } }) => brand.name)),
        ];

        return uniqueBrands.map((n) => n);
      }

      return null;
    },
    show: true,
  },
  {
    Header: 'Company',
    accessor: 'company',
    minWidth: 110,
    Cell: ({ value: company }) => <>{company?.username}</>,
    show: true,
  },
  {
    Header: 'Created By',
    accessor: 'createdBy',
    Cell: ({ value: createdBy }) => (
      <>
        {createdBy && (
          <span className="text-body">
            {createdBy.firstName}
            {createdBy.lastName}
          </span>
        )}
      </>
    ),
    show: true,
  },
  {
    Header: 'TeamLead',
    accessor: 'teamLead',
    Cell: ({ value: teamLead }) => (
      <>
        {teamLead && (
          <span className="text-body">
            {teamLead.firstName} {teamLead.lastName}
          </span>
        )}
      </>
    ),
    show: true,
  },
  {
    Header: 'Actions',
    accessor: 'saleId',
    Cell: ({ row }) => (
      <div className="form-inline float-md-start mb-3">
        <div className="search-box ms-2">
          <div className="position-relative">
            <button
              className="btn btn-primary w-100 waves-effect waves-light"
              type="submit"
              onClick={() =>
                historyPush(`users/edit/?id=${hashing(row?.original?.id)}`)
              }
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    ),
    maxWidth: 50,
    minWidth: 50,
    show: [
      UserRole.Admin,
      UserRole.SuperManager,
      UserRole.Company,
      UserRole.CrmManager,
      UserRole.DeskManager,
    ].includes(userRole),
  },
].filter(({ show }) => show);

export default UsersColumnList;
