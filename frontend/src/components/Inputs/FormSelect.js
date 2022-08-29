import { Component } from 'react';
import Select from 'react-select';
import { isEqual, snakeCase } from 'lodash';

function _createOption(item, selectId) {
  const { firstName, lastName, id, name, role, value, label, ...rest } = item;
  const newLabel = label
    ? label
    : firstName && lastName
    ? `${firstName} ${lastName}`
    : role
    ? role
    : name;

  return {
    value: item.hasOwnProperty('value') ? value : id,
    label: newLabel,
    id: `${selectId}-option-${item.value}`,
    ...rest,
  };
}

class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: null,
    };
  }

  static defaultProps = {
    multi: false,
    placeholder: 'Please select',
    closeOnSelect: true,
    removeInitial: false,
  };

  componentWillMount() {
    const {
      load,
      options,
      removeInitial,
      defaultValue,
      id = 'select',
      value,
    } = this.props;
    if (load) {
      load({ $take: 100 }).then((options) => {
        if (options) {
          this.handleNewOptions(options, removeInitial);
        }
      });
    }

    if (options) {
      const adjustedOptions = this.adjustOptions(options, id);
      this.handleNewOptions(adjustedOptions, removeInitial);
    }
    if (defaultValue) {
      this.onChange(defaultValue);
    }
    if (value) {
      this.setState({ value });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    const { options } = this.state;
    const {
      removeInitial,
      id = 'select',
      trackDefaultValueChange = true,
    } = this.props;

    if (nextProps.options) {
      const adjustedOptions = this.adjustOptions(nextProps.options, id);
      if (!isEqual(options, adjustedOptions)) {
        this.setState({
          options: adjustedOptions,
        });
        if (input) {
          if (input.value) {
            let newValue = null;
            if (Array.isArray(input.value)) {
              newValue = input.value.reduce((result, inputValue) => {
                if (
                  adjustedOptions.find(
                    (item) => item.value === inputValue.value,
                  )
                ) {
                  result.push(inputValue);
                }
                return result;
              }, []);
            } else {
              newValue = adjustedOptions.find(
                (item) => item.value === input.value.value,
              );
            }
            if (!newValue) {
              this.onChange(null);
            }
          } else {
            this.onChange(null);
          }
        } else {
          if (!removeInitial) {
            this.onChange(adjustedOptions[0]);
          }
          if (!this.props.value) {
            this.setState({ value: null });
          }
        }
      } else if (input && input.value && this.state.value) {
        const newValue = input.value.value;
        const currentvalue = this.state.value.value;

        if (newValue !== currentvalue) {
          this.onChange(input.value);
        }
      }
    }

    if (
      !isEqual(nextProps.defaultValue, this.props.defaultValue) &&
      trackDefaultValueChange
    ) {
      this.onChange(nextProps.defaultValue);
    }
  }

  adjustOptions = (options, selectId) =>
    options.map((option) => _createOption(option, selectId));

  handleNewOptions = (options, removeInitial) => {
    const { input } = this.props;
    const firstOption = removeInitial ? null : options[0];
    const value = input && input.value ? input.value : firstOption;

    this.setState({ options, value });
    this.setNewValue(value);
  };

  setNewValue = (value) => {
    const { onSelect, input } = this.props;
    const { options } = this.state;

    if (input) {
      input.onChange(value);
    }

    if (onSelect && options.length) {
      onSelect(value);
    }
  };

  onChange = (value) => {
    this.setState({ value });
    this.setNewValue(value);
  };

  getPropsForSelect = () => {
    const { options, value: valueState } = this.state;
    const { value: valueProps } = this.props;

    let {
      placeholder,
      multi: isMulti,
      isDisabled,
      closeOnSelect: closeMenuOnSelect,
      input,
      id,
      name,
      autoFocus,
      clearable: isClearable = true,
      controlled = false,
    } = this.props;

    placeholder = <span>{placeholder}</span>;

    let value = null;
    if (controlled) {
      value = valueProps;
    } else {
      value = valueProps || valueState;
    }

    const props = {
      inputId: `select-input-${snakeCase(
        id || input.id || name || input.name,
      )}`,
      type: 'text',
      isClearable,
      autoFocus,
      isMulti,
      options,
      placeholder,
      value,
      isDisabled: isDisabled || false,
      closeMenuOnSelect,
    };

    if (this.props.menuPortalTarget) {
      props.menuPortalTarget = this.props.menuPortalTarget;
    }

    return props;
  };

  render() {
    const { meta, isDisabled = false, input, id, name } = this.props;

    return (
      <div
        id={`select-wrapper-${snakeCase(id || input.id || name || input.name)}`}
      >
        <Select
          {...this.getPropsForSelect()}
          onChange={this.onChange}
          onSelect={this.onSelect}
          disabled={isDisabled}
          style={{
            menu: (styles) => ({ ...styles, 'z-index': 30 }),
          }}
        />
        {meta && meta.touched && meta.error && (
          <span className="error-message">{meta.error}</span>
        )}
      </div>
    );
  }
}

export default FormSelect;
