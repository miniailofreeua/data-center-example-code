import {
  AssignUserDeskForm,
  AssignTeamLeadForm,
  AssignUserBrandsForm,
  ImportCustomizationForm,
  DeskAssignForm,
  CompanyAssignForm,
  TeamLeadAgentAssign,
} from '../../../../forms';
import BrandPullApiForm from '../../../../forms/BrandForm/BrandPullApisTable/BrandPullApiForm';
import BrandUpdateApiForm from '../../../../forms/BrandForm/BrandUpdateApisTable/BrandUpdateApiForm';

const formsConfigSwitch = (formName) => {
  const formsMap = {
    userDesks: (props) => (
      <>
        <AssignUserDeskForm {...props} />
      </>
    ),
    userBrands: (props) => (
      <>
        <AssignUserBrandsForm {...props} />
      </>
    ),
    teamLeads: (props) => (
      <>
        <AssignTeamLeadForm {...props} />
      </>
    ),
    importForm: (props) => (
      <>
        <ImportCustomizationForm {...props} />
      </>
    ),
    brandUpdateApis: (props) => (
      <>
        <BrandUpdateApiForm {...props} />
      </>
    ),
    brandPullApis: (props) => (
      <>
        <BrandPullApiForm {...props} />
      </>
    ),
    deskAssign: (props) => (
      <>
        <DeskAssignForm {...props} />
      </>
    ),
    companyAssign: (props) => (
      <>
        <CompanyAssignForm {...props} />
      </>
    ),
    teamLeadAgentAssign: (props) => (
      <>
        <TeamLeadAgentAssign {...props} />
      </>
    ),
  };
  try {
    return formsMap[formName];
  } catch (e) {
    throw new Error(`Form with ['${formName}'] name does not exist in config`);
  }
};

export default formsConfigSwitch;
