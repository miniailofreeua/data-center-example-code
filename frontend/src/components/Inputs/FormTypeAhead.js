import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { snakeCase, isEqual } from 'lodash';

class TypeAhead extends Component {
  state = {
    multi: false,
    defaultOptions: null,
    triggerValueOnChange: null,
  };

  async componentWillMount() {
    /*
			preventPreload set to true - if the "load()" response is too large to preload
			(e.g.: Users list)
		*/
    const {
      input,
      value,
      load,
      multi,
      preventPreload,
      selectedIdsKey = 'selectedIds',
      removeInitial = true,
    } = this.props;

    if (input) {
      const value = input && input.value ? input.value : null;
      this.setState({ value });
      this.setNewValue(value);
    }

    if (value && !preventPreload) {
      const initialValues = await load();
      let newValue;

      if (multi) {
        newValue = initialValues.filter((item) =>
          value.map(String).includes(String(item.value)),
        );
      } else {
        newValue = initialValues.find(
          (item) => String(item.value) === String(value),
        );
      }

      this.setState({ value: newValue });
      this.setNewValue(newValue);
    }

    if (value && preventPreload) {
      const formattedValue = Array.isArray(value) ? value : [value];
      const response = await load({ [selectedIdsKey]: formattedValue });

      const newValue = multi ? response : response[0];

      this.setState({ value: newValue });
      this.setNewValue(newValue);
    }

    if (!removeInitial && !value) {
      const initialValues = await load();

      const newValue = initialValues[0];
      this.setState({ value: newValue });
      this.setNewValue(newValue);
    }
  }

  componentDidMount() {
    if (this.props.triggerValueOnChange) {
      this.setState({ triggerValueOnChange: this.props.triggerValueOnChange });
    }
  }

  async componentDidUpdate(prevProps) {
    /*
			triggerValueOnChange - used to update defaultOptions based on changed trigger values
			({ [key: string]: any })
		*/
    if (
      this.state.triggerValueOnChange &&
      !isEqual(prevProps.triggerValueOnChange, this.props.triggerValueOnChange)
    ) {
      const defaultOptions = await this.props.load();
      this.setState({ defaultOptions });
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('resetValue') && !nextProps.resetValue) {
      this.setState({
        value: null,
      });
    }
  }

  setNewValue = (value) => {
    const { onSelect, input } = this.props;
    if (input) {
      input.onChange(value);
    }
    if (onSelect) {
      onSelect(value);
    }
  };

  onChange = (value) => {
    this.setState({ value });
    this.setNewValue(value);
  };

  loadData = (value) => {
    const { load } = this.props;

    if (!load) {
      return;
    }

    if (typeof value === 'string') {
      return load(value.trim());
    } else {
      return load(value);
    }
  };

  renderTypeAhead = () => {
    // TODO: handle typeAheadProps in better way
    const {
      id,
      name,
      placeholder,
      input = {},
      multi,
      meta,
      disabled = false,
      clearable = true,
      closeMenuOnSelect = true,
      menuPortalTarget,
      autoFocus,
    } = this.props;

    const { value, defaultOptions } = this.state;

    const typeAheadProps = {
      type: 'text',
      autosize: false,
      loadOptions: this.loadData,
      placeholder: placeholder ? <span>{placeholder}</span> : 'Type to search',
      isMulti: multi,
      defaultOptions: defaultOptions || true,
      isDisabled: disabled,
      isClearable: clearable,
      closeMenuOnSelect,
      menuPortalTarget,
      autoFocus,
    };

    return (
      <>
        <AsyncSelect
          {...typeAheadProps}
          id={`autocomplete-wrapper-${snakeCase(
            id || input.id || name || input.name,
          )}`}
          inputId={`autocomplete-input-${snakeCase(
            id || input.id || name || input.name,
          )}`}
          onChange={this.onChange}
          value={value}
          style={{
            menu: (styles) => ({ ...styles, 'z-index': 30 }),
          }}
        />
        {meta && meta.touched && meta.error && (
          <span className="error-message">{meta.error}</span>
        )}
      </>
    );
  };

  render() {
    return this.renderTypeAhead();
  }
}

export default TypeAhead;
