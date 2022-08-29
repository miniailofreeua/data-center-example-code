import { UserRole } from '../../../enums';
import {
  UserRoleListForAdmin,
  UserRoleListForSuperManager,
  UserRoleListForCompany,
  UserRoleListForCrmManager,
  UserRoleListForDeskManager,
  UserRoleListForTeamLead,
} from '../../../helpers/getRoleList';

const userRole = localStorage.getItem('userRole');

export default function checkWhatForRoleOptions() {
  switch (userRole) {
    case UserRole.SuperManager:
      return UserRoleListForSuperManager;
    case UserRole.Company:
      return UserRoleListForCompany;
    case UserRole.CrmManager:
      return UserRoleListForCrmManager;
    case UserRole.DeskManager:
      return UserRoleListForDeskManager;
    case UserRole.TeamLead:
      return UserRoleListForTeamLead;
    default:
      return UserRoleListForAdmin;
  }
}
