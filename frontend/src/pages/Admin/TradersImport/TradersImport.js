import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import saveAs from 'file-saver';

import { UserRole } from '../../../enums';

import './TradersImport.scss';
import RoleManager from '../../../containers/RoleManager/RoleManager';
import { ContentPage, Stepper } from '../../../components';
import { request } from '../../../API/request';
import { getConfigParams } from '../../../API/configParams';
import { clearImportedTraders } from '../../../store/actions';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

class TradersImport extends Component {
  componentWillUnmount() {
    this.props.actions.clearImportedTraders();
  }

  getTemplateCsv = async () => {
    const config = getConfigParams({
      url: 'traders/import',
      options: {
        template: 'true',
      },
      method: 'GET',
    });
    const data = await request(config);
    const blob = new Blob([data]);
    saveAs(blob, 'import-traders-template.csv');
  };

  render() {
    return (
      <ContentPage pageName="Import Traders">
        <div className="traders-import shadow-wrapper bg-white">
          <Stepper header={['Upload CSV File', 'Done']}>
            <Step1 />
            <Step2 />
          </Stepper>
        </div>
      </ContentPage>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ clearImportedTraders }, dispatch),
});

export default RoleManager(connect(null, mapDispatchToProps)(TradersImport), [
  UserRole.Admin,
]);
