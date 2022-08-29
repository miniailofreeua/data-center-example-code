import { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import * as XLSX from 'xlsx';

import { tradersImportParse } from '../../../../store/traders/import/TradersImportActions';
import { openModal } from '../../../../store/actions';
import { TypeAhead } from '../../../../components';
import TypeAheadLoadService from '../../../../services/TypeAheadLoadService';

const initialState = {
  file: null,
  fileName: '',
  error: '',
  showDropzone: true,
  tableData: {},
  skippedFields: [],
  loading: false,
  brandId: null,
};

class Step1 extends Component {
  state = initialState;
  reader = new FileReader();

  hadleFileError = (files) => {
    const file = files[0];

    if (file.type !== 'text/xlsx') {
      this.setState({
        error: 'Upload valid file format. File must have .xlsx extension.',
      });
    } else if (file.size > 5000000) {
      this.setState({
        error: 'Your file is too big. Max file size is 5MB',
      });
    }
  };

  handleChangeFile = (file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      this.setState({ file, skippedFields: [], tableData: data });
    };
    reader.readAsBinaryString(file);
  };

  handleFileChange = (files) => {
    const file = files[0];
    if (file) {
      this.reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

        this.setState({ file, skippedFields: [], tableData: data });
      };
      this.reader.readAsBinaryString(file);
      this.setState({
        file,
        fileName: file.name,
        fileSize: file.size / 1000 + 'KB',
        error: '',
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isActive !== this.props.isActive) {
      this.setState(initialState);
    }
  }

  renderDropzone = (error) => (
    <Dropzone
      accept=".xlsx"
      maxSize={5242880}
      multiple={false}
      onDrop={this.handleFileChange}
      onDropRejected={this.hadleFileError}
      onDropAccepted={this.showDetails}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone-container mx-auto my-2" {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="dropzone-text">
            <p>Click or drag a file</p>
            <div>{error}</div>
          </div>
          <FontAwesomeIcon
            icon={error ? faTimesCircle : faFileUpload}
            size="4x"
            color="#999"
          />
        </div>
      )}
    </Dropzone>
  );

  renderDetails = () => {
    const { fileName, fileSize, loading, file, brandId } = this.state;

    const { toStep } = this.props;

    return (
      <div className="pr-3 pb-3">
        {fileName && (
          <div className="d-flex align-items-start py-2">
            <div className="col-md-3">File name</div>
            <div className="col-md-8">{fileName}</div>
          </div>
        )}
        {fileSize && (
          <div className="d-flex align-items-start py-2">
            <div className="col-md-3">File size</div>
            <div className="col-md-8">{fileSize}</div>
          </div>
        )}
        <div className="d-flex justify-content-end py-3">
          <button
            className={classNames(
              'btn',
              'align-self-start',
              loading ? 'btn-secondary' : 'btn-warning',
            )}
            onClick={() => {
              this.props.actions.openModal({
                id: 'import-form',
                type: 'form',
                payload: {
                  header: 'Custom Fields',
                  formName: 'importForm',
                },
              });
            }}
          >
            Set Custom Fields
          </button>
          <button
            className={classNames(
              'btn mx-2',
              loading ? 'btn-secondary' : 'btn-primary ',
            )}
            onClick={this.showDropzone}
            disabled={loading}
          >
            Reupload file
          </button>
          <button
            className={classNames(
              'btn',
              loading ? 'btn-secondary' : 'btn-primary',
            )}
            disabled={!file || loading}
            onClick={() => {
              this.setState({ loading: true });
              this.props.actions.tradersImportParse(
                {
                  file: this.state.file,
                },
                toStep(1),
                brandId,
              );
            }}
          >
            Upload file to Database
          </button>
        </div>
      </div>
    );
  };
  handleBrandsLoad = (options) => (value) =>
    TypeAheadLoadService.loadBrands(options, value);

  showDropzone = () => this.setState(initialState);
  showDetails = () => this.setState({ showDropzone: false });
  handleBrandChange = (value) => {
    const brandId = value ? value.value : null;
    this.setState({ brandId });
  };

  render() {
    const { error, showDropzone, brandId } = this.state;
    const { isActive } = this.props;

    if (!isActive) {
      return null;
    }
    return (
      <div>
        <div>
          <label>Brand:</label>
          <TypeAhead
            name="brands"
            load={this.handleBrandsLoad({})}
            placeholder="Select Brand"
            multi={false}
            onSelect={this.handleBrandChange}
            clearable={true}
            removeInitial={true}
            preventPreload={true}
            value={brandId}
          />
        </div>
        {brandId
          ? showDropzone
            ? this.renderDropzone(error)
            : this.renderDetails()
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ TradersImport: { loading } }) => ({
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ tradersImportParse, openModal }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
