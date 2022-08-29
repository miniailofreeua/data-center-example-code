import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomLink from '../../../../components/Common/CustomLink';

class Step2 extends Component {
  render() {
    const { isActive, uploadedTraders } = this.props;

    return (
      isActive && (
        <div>
          <h2 className="text-center">Done</h2>
          <h4 className="text-center">
            {uploadedTraders.length} traders were uploaded to our database.
          </h4>
          <h4 className="text-center">
            Get back to <CustomLink to="/traders">Traders</CustomLink>
          </h4>
        </div>
      )
    );
  }
}

const mapStateToProps = ({ TradersImport: { uploadedTraders } }) => ({
  uploadedTraders,
});

export default connect(mapStateToProps)(withRouter(Step2));
